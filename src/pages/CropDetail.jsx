import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, MapPin, ChevronLeft, Calendar, Info, Bell, Share2 } from 'lucide-react';
import TrendChart from '../components/TrendChart';

const CropDetail = () => {
    const { name } = useParams();
    const navigate = useNavigate();

    // Mock Detail Data
    const mockDetails = {
        name: name,
        price: 2450,
        unit: 'Quintal',
        change: '+2.4%',
        high: 2600,
        low: 2100,
        forecast: 'Bullish',
        description: `${name} prices have shown a steady recovery this month due to limited arrivals in major mandis across Punjab and Haryana. Export demand is expected to remain firm in the coming weeks.`,
        mandis: [
            { name: 'Khanna, Punjab', price: 2450, trend: 'up' },
            { name: 'Sirsa, Haryana', price: 2420, trend: 'up' },
            { name: 'Mansa, Punjab', price: 2380, trend: 'down' },
            { name: 'Bhatinda, Punjab', price: 2410, trend: 'stable' }
        ]
    };

    const chartData = [2100, 2150, 2200, 2180, 2250, 2300, 2450];
    const chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

    return (
        <div className="container" style={{ padding: '3rem 1.5rem' }}>
            <button
                onClick={() => navigate(-1)}
                style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: 'none', border: 'none', color: 'var(--color-primary)',
                    cursor: 'pointer', fontWeight: '600', marginBottom: '2rem'
                }}
            >
                <ChevronLeft size={20} /> Back to Market
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2.5rem', alignItems: 'start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Main Info Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="premium-card"
                        style={{ padding: '2.5rem' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div>
                                <h1 style={{ fontSize: '2.5rem', color: 'var(--color-text-main)', marginBottom: '8px' }}>{mockDetails.name}</h1>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <span style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-primary)' }}>₹{mockDetails.price} <span style={{ fontSize: '1rem', fontWeight: '400', color: 'var(--color-text-muted)' }}>/{mockDetails.unit}</span></span>
                                    <span className="badge-price badge-up" style={{ fontSize: '1rem', padding: '6px 14px' }}>
                                        <TrendingUp size={16} /> {mockDetails.change}
                                    </span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button className="btn-agri btn-agri-outline" style={{ padding: '0.75rem' }}><Bell size={20} /></button>
                                <button className="btn-agri btn-agri-outline" style={{ padding: '0.75rem' }}><Share2 size={20} /></button>
                            </div>
                        </div>

                        <div style={{ marginTop: '3rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem' }}>Price Performance (6 Months)</h3>
                                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-primary)' }}></div> Forecast</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#CBD5E1' }}></div> Historical</div>
                                </div>
                            </div>
                            <div style={{ height: '350px' }}>
                                <TrendChart data={chartData} labels={chartLabels} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Description Section */}
                    <div className="premium-card">
                        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Info size={20} className="logo-icon" /> Market Analysis</h3>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8' }}>{mockDetails.description}</p>
                    </div>
                </div>

                {/* Sidebar Analytics */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="premium-card"
                    >
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Local Mandi Rates</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {mockDetails.mandis.map((mandi, idx) => (
                                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--color-background)', borderRadius: '12px' }}>
                                    <div>
                                        <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{mandi.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Mandi Status: Active</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: '700', color: 'var(--color-text-main)' }}>₹{mandi.price}</div>
                                        <div style={{ fontSize: '0.75rem', color: mandi.trend === 'up' ? '#166534' : '#991B1B' }}>
                                            {mandi.trend === 'up' ? '▲ High' : mandi.trend === 'down' ? '▼ Low' : '● Stable'}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <div className="premium-card" style={{ background: 'var(--color-primary)', color: 'white' }}>
                        <h3 style={{ marginBottom: '1rem', color: 'white' }}>AI Quick Tips</h3>
                        <ul style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', opacity: 0.9 }}>
                            <li style={{ display: 'flex', gap: '10px' }}><CheckCircle size={16} /> Hold for 2 more weeks for better ROI.</li>
                            <li style={{ display: 'flex', gap: '10px' }}><CheckCircle size={16} /> Market Arrivals decreasing in North India.</li>
                            <li style={{ display: 'flex', gap: '10px' }}><CheckCircle size={16} /> High international demand rising.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CropDetail;
