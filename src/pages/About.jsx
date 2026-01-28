import React from 'react';
import { Target, Users, ShieldCheck, Database } from 'lucide-react';

const About = () => {
    return (
        <div className="container" style={{ padding: '3rem 1rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ color: 'var(--color-primary)', textAlign: 'center', marginBottom: '2rem' }}>About AgriPrice</h1>

                <section style={{ marginBottom: '3rem' }}>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--color-text)', textAlign: 'center' }}>
                        We are on a mission to empower farmers, traders, and agribusinesses with democratized access to
                        real-time market data and AI-driven price forecasts. By bridging the information gap,
                        we help the agricultural community make smarter, more profitable decisions.
                    </p>
                </section>

                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Our Core Values</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div className="card" style={{ textAlign: 'center' }}>
                            <div style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}><Target size={40} /></div>
                            <h3>Accuracy</h3>
                            <p>We leverage advanced machine learning models trained on decades of historical data to provide precise forecasts.</p>
                        </div>
                        <div className="card" style={{ textAlign: 'center' }}>
                            <div style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}><Users size={40} /></div>
                            <h3>Inclusivity</h3>
                            <p>Designed for everyone from small-holder farmers to large export houses, with an accessible mobile-first interface.</p>
                        </div>
                        <div className="card" style={{ textAlign: 'center' }}>
                            <div style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}><ShieldCheck size={40} /></div>
                            <h3>Transparency</h3>
                            <p>We are open about our data sources and prediction confidence levels. No hidden agendas.</p>
                        </div>
                        <div className="card" style={{ textAlign: 'center' }}>
                            <div style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}><Database size={40} /></div>
                            <h3>Data-Driven</h3>
                            <p>Every insight is backed by verified mandi reports, weather station data, and global market trends.</p>
                        </div>
                    </div>
                </section>

                <section className="card" style={{ padding: '2rem', background: '#E8F5E9' }}>
                    <h2 style={{ color: 'var(--color-primary)', marginTop: 0 }}>How It Works</h2>
                    <p>
                        Our platform aggregates prices from over 500+ mandis daily. Our proprietary AI engine analyzes this data
                        along with soil moisture levels, rainfall predictions, and export demand to forecast prices up to 6 months in advance.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default About;
