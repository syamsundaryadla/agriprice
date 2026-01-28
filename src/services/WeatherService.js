// WeatherService.js
const API_KEY = '4b1f1f48f9a74115eb9f8cfe213e49e5';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (lat, lon) => {
    // Default to New Delhi if location not provided
    const query = lat && lon ? `lat=${lat}&lon=${lon}` : `q=New Delhi,IN`;

    try {
        const response = await fetch(`${BASE_URL}?${query}&units=metric&appid=${API_KEY}`);
        if (!response.ok) throw new Error('Weather fetch failed');
        return await response.json();
    } catch (error) {
        console.error("Weather Service Error:", error);
        return null;
    }
};

export const fetchWeatherByCity = async (city) => {
    try {
        const response = await fetch(`${BASE_URL}?q=${city},IN&units=metric&appid=${API_KEY}`);
        if (!response.ok) throw new Error('Weather fetch failed');
        return await response.json();
    } catch (error) {
        console.error("Weather Service Error:", error);
        return null;
    }
};
