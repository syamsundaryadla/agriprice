import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Sprout } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-container">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hero-content"
                >
                    <div className="hero-badge">
                        <Sprout size={16} /> <span>Official eNAM Data Partner</span>
                    </div>
                    <h1>Live Market Prices for <span className="highlight">Crops Across India</span></h1>
                    <p>
                        Access real-time market rates, historical trends, and AI-driven forecasts
                        to make informed decisions for your crops and business.
                    </p>
                    <div className="hero-actions">
                        <Link to="/prices" className="btn btn-primary btn-lg">
                            <TrendingUp size={20} style={{ marginRight: '8px' }} />
                            View Live Prices
                        </Link>
                        <Link to="/predictions" className="btn btn-outline btn-lg">
                            Get Price Forecast
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hero-visual"
                >
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="visual-card"
                    >
                        <div className="card-header">
                            <span>Wheat / Quintal</span>
                            <span className="trend-up">+2.4%</span>
                        </div>
                        <div className="card-price">₹2,150</div>
                        <div className="card-mini-chart">
                            <motion.div initial={{ height: 0 }} animate={{ height: '40%' }} transition={{ delay: 0.5 }}></motion.div>
                            <motion.div initial={{ height: 0 }} animate={{ height: '60%' }} transition={{ delay: 0.6 }}></motion.div>
                            <motion.div initial={{ height: 0 }} animate={{ height: '50%' }} transition={{ delay: 0.7 }}></motion.div>
                            <motion.div initial={{ height: 0 }} animate={{ height: '75%' }} transition={{ delay: 0.8 }}></motion.div>
                            <motion.div initial={{ height: 0 }} animate={{ height: '85%' }} transition={{ delay: 0.9 }}></motion.div>
                        </div>
                    </motion.div>

                    <div className="visual-stats">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="stat-item"
                        >
                            <span className="stat-value">50+</span>
                            <span className="stat-label">Commodities</span>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1 }}
                            className="stat-item"
                        >
                            <span className="stat-value">95%</span>
                            <span className="stat-label">Accuracy</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
