import React from 'react';
import Hero from '../components/Hero';
import WeatherWidget from '../components/WeatherWidget';
import IndiaMap from '../components/IndiaMap';
import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck, Zap } from 'lucide-react';

const Home = () => {
    return (
        <div style={{ overflowX: 'hidden' }}>
            <Hero />

            <div className="container" style={{ marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ gridColumn: 'span 2' }}
                    >
                        <IndiaMap />
                    </motion.div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="premium-card"
                            style={{ flex: 1 }}
                        >
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                                <TrendingUp size={24} /> Market Insights
                            </h3>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                Tracking over 50+ commodities across 1000+ mandis daily.
                                Get the most accurate rates powered by direct eNAM integration.
                            </p>
                            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--color-light-green)', borderRadius: '12px' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-primary)', textTransform: 'uppercase' }}>Top Gainer</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                                    <span style={{ fontWeight: '700' }}>Soybean</span>
                                    <span style={{ color: '#166534', fontWeight: '700' }}>+4.2%</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="premium-card"
                        >
                            <WeatherWidget />
                        </motion.div>
                    </div>
                </div>

                <section style={{ marginBottom: '6rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>The AgriPrice Advantage</h2>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Scalable, production-ready intelligence for the modern farmer.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {[
                            { icon: <ShieldCheck />, title: 'Trustworthy Data', desc: 'Sourced directly from eNAM and Government of India market portals.' },
                            { icon: <Zap />, title: 'Real-time Updates', desc: 'Syncing daily with mandi reporting systems for instant rate availability.' },
                            { icon: <TrendingUp />, title: 'AI Predictions', desc: 'Advanced ML models forecasting prices based on 10+ years of historical data.' }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="premium-card"
                                style={{ textAlign: 'center', padding: '3.5rem 2rem' }}
                            >
                                <div style={{
                                    width: '72px', height: '72px', margin: '0 auto 1.5rem',
                                    background: 'var(--color-light-green)', borderRadius: '20px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'var(--color-primary)',
                                    boxShadow: '0 8px 16px rgba(6, 95, 70, 0.1)'
                                }}>
                                    {React.cloneElement(item.icon, { size: 32 })}
                                </div>
                                <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{item.title}</h3>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
