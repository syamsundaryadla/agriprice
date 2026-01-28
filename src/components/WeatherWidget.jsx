import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets } from 'lucide-react';
import { fetchWeatherByCity } from '../services/WeatherService';

const WeatherWidget = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState('New Delhi');

    useEffect(() => {
        const loadWeather = async () => {
            setLoading(true);
            const data = await fetchWeatherByCity(city);
            setWeather(data);
            setLoading(false);
        };
        loadWeather();
    }, [city]);

    if (loading) return <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>Loading Weather...</div>;
    if (!weather) return null;

    const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

    return (
        <div className="card weather-card" style={{
            background: 'linear-gradient(135deg, #059669 0%, #34D399 100%)',
            color: 'white',
            border: 'none',
            boxShadow: 'var(--shadow-premium)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sun /> Weather
                </h3>
                <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '0.25rem', borderRadius: '4px', cursor: 'pointer' }}
                >
                    <option value="New Delhi" style={{ color: 'black' }}>Delhi</option>
                    <option value="Mumbai" style={{ color: 'black' }}>Mumbai</option>
                    <option value="Chandigarh" style={{ color: 'black' }}>Chandigarh</option>
                    <option value="Lucknow" style={{ color: 'black' }}>Lucknow</option>
                    <option value="Bhopal" style={{ color: 'black' }}>Bhopal</option>
                    <option value="Jaipur" style={{ color: 'black' }}>Jaipur</option>
                    <option value="Kolkata" style={{ color: 'black' }}>Kolkata</option>
                    <option value="Pune" style={{ color: 'black' }}>Pune</option>
                </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{Math.round(weather.main.temp)}°C</div>
                    <div style={{ textTransform: 'capitalize', opacity: 0.9 }}>{weather.weather[0].description}</div>
                </div>
                <img src={iconUrl} alt="Weather icon" style={{ width: '80px', height: '80px' }} />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem' }}>
                    <Wind size={16} /> {weather.wind.speed} m/s
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem' }}>
                    <Droplets size={16} /> {weather.main.humidity}%
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;
