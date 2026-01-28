import React, { useState } from 'react';
import TrendChart from '../components/TrendChart';
import { Calendar, AlertTriangle, CheckCircle, TrendingUp, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const Predictions = () => {
    const [commodity, setCommodity] = useState('Wheat');
    const [location, setLocation] = useState('Punjab');

    // Mock Prediction Data
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

    // Logic to change data specific to commodity (mock)
    const getMockData = (comm) => {
        if (comm === 'Rice') return [3600, 3650, 3700, 3750, 3800, 3700, 3650];
        if (comm === 'Maize') return [1900, 1920, 1950, 2000, 2100, 2150, 2100];
        if (comm === 'Soybean') return [4200, 4300, 4450, 4600, 4550, 4700, 4800];
        return [2100, 2150, 2200, 2180, 2250, 2300, 2400]; // Wheat default
    };

    const currentData = getMockData(commodity);

    return (
        <div className="container" style={{ padding: '4rem 1.5rem' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
                    AI Price Forecasting
                </h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '700px' }}>
                    Leverage advanced machine learning models trained on 10+ years of historical market data and climate patterns to predict future price shifts.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2.5rem', alignItems: 'start' }}>
                {/* Parameters Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="premium-card"
                >
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem' }}>
                        <Info size={20} className="logo-icon" /> Parameters
                    </h3>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Select Commodity</label>
                        <select
                            value={commodity}
                            onChange={(e) => setCommodity(e.target.value)}
                            style={{
                                width: '100%', padding: '0.85rem', borderRadius: '12px',
                                border: '1px solid var(--color-border)', fontSize: '1rem',
                                background: 'white', outline: 'none'
                            }}
                        >
                            <option>Wheat</option>
                            <option>Rice</option>
                            <option>Maize</option>
                            <option>Mustard</option>
                            <option>Soybean</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Select Region</label>
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            style={{
                                width: '100%', padding: '0.85rem', borderRadius: '12px',
                                border: '1px solid var(--color-border)', fontSize: '1rem',
                                background: 'white', outline: 'none'
                            }}
                        >
                            <option>Punjab</option>
                            <option>Haryana</option>
                            <option>Madhya Pradesh</option>
                            <option>Uttar Pradesh</option>
                            <option>Maharashtra</option>
                        </select>
                    </div>

                    <div style={{ padding: '1.5rem', background: 'var(--color-light-green)', borderRadius: '16px' }}>
                        <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: 'var(--color-primary)' }}>Forecast Snapshot</h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>6-Month Target</span>
                            <span style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>₹{currentData[currentData.length - 1]}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Market Sentiment</span>
                            <span style={{ color: '#166534', fontWeight: '700', fontSize: '0.9rem' }}>Bullish</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Model Confidence</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-primary)', fontWeight: '700', fontSize: '0.9rem' }}>
                                <CheckCircle size={14} /> 92%
                            </span>
                        </div>
                    </div>

                    <button className="btn-agri btn-agri-primary" style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}>
                        Generate Detailed Report
                    </button>
                </motion.div>

                {/* Main Content Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="premium-card"
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>Expected Price Trend</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Mandi: {location} | Commodity: {commodity}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--color-text-muted)', padding: '6px 12px', background: 'var(--color-background)', borderRadius: '100px' }}>
                                <Calendar size={14} /> 6-Month Projection
                            </div>
                        </div>

                        <div style={{ height: '350px', width: '100%' }}>
                            <TrendChart data={currentData} labels={labels} />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{
                            padding: '1.5rem',
                            background: '#FFFBEB',
                            borderRadius: '20px',
                            border: '1px solid #FEF3C7',
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'start'
                        }}
                    >
                        <AlertTriangle size={24} style={{ color: '#D97706', flexShrink: 0 }} />
                        <div>
                            <h4 style={{ color: '#92400E', marginBottom: '0.5rem', fontSize: '1rem' }}>Expert Advisory</h4>
                            <p style={{ color: '#B45309', margin: 0, fontSize: '0.9rem', lineHeight: '1.6' }}>
                                While our AI predicts a bullish trend for {commodity}, keep an eye on upcoming rainfall forecasts for the {location} region.
                                Significant rainfall during late harvest could impact final market arrivals and cause price volatility.
                                <strong> Suggestion:</strong> Consider partial sale at ₹{currentData[currentData.length - 2]} to lock in steady profits.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Predictions;
