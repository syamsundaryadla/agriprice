import React, { useState } from 'react';
import { TrendingUp, TrendingDown, MapPin, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AlertsModal from './AlertsModal';
import './PriceCard.css';

const PriceCard = ({ commodity, price, unit, trend, change, location, lastUpdated, isReal }) => {
    const isTrendUp = trend === 'up' || change !== '0.0';
    const { currentUser } = useAuth();
    const [showModal, setShowModal] = useState(false);

    // Dynamic icon/color based on commodity (Simplified for demo)
    const getCommodityColor = (name) => {
        const colors = {
            'Wheat': '#F59E0B',
            'Rice': '#10B981',
            'Maize': '#FBBF24',
            'Cotton': '#F3F4F6',
            'Soybean': '#D97706'
        };
        return colors[name] || 'var(--color-primary-light)';
    };

    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, boxShadow: "var(--shadow-premium)" }}
                className="premium-card"
                style={{ cursor: 'pointer', position: 'relative' }}
            >
                <Link to={`/crop/${commodity}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'start' }}>
                        {/* Crop Thumbnail Placeholder */}
                        <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '16px',
                            backgroundColor: getCommodityColor(commodity),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: 'rgba(0,0,0,0.2)',
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                            {commodity.charAt(0)}
                        </div>

                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', color: 'var(--color-text-main)', marginBottom: '4px' }}>{commodity}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                        <MapPin size={12} /> {location}
                                    </div>
                                </div>
                                <span className={`badge-price ${isTrendUp ? 'badge-up' : 'badge-down'}`}>
                                    {isTrendUp ? <TrendingUp size={12} style={{ marginRight: '3px' }} /> : <TrendingDown size={12} style={{ marginRight: '3px' }} />}
                                    {change}%
                                </span>
                            </div>

                            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-primary)' }}>₹{price.toLocaleString()}</span>
                                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>/{unit}</span>
                            </div>
                        </div>
                    </div>
                </Link>

                <div style={{
                    marginTop: '1.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--color-border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 2
                }}>

                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Last Updated: {lastUpdated}
                    </span>

                    {currentUser ? (
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowModal(true)}
                            style={{
                                background: 'none', border: 'none', color: 'var(--color-primary)',
                                display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer',
                                fontSize: '0.85rem', fontWeight: '600'
                            }}
                        >
                            <Bell size={14} /> Set Alert
                        </motion.button>
                    ) : (
                        <div style={{ height: '24px' }} />
                    )}
                </div>

                {isReal && (
                    <div style={{
                        position: 'absolute', top: 0, right: 0,
                        background: 'var(--color-primary)', color: 'white',
                        fontSize: '0.6rem', padding: '2px 8px', borderRadius: '0 0 0 8px',
                        fontWeight: '700'
                    }}>
                        LIVE ENAM
                    </div>
                )}
            </motion.div>

            {showModal && (
                <AlertsModal
                    commodity={commodity}
                    currentPrice={price}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
};

export default PriceCard;
