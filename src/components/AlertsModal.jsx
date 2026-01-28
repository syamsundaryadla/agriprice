import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { X, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { app } from '../firebase';

const AlertsModal = ({ commodity, currentPrice, onClose }) => {
    const [targetPrice, setTargetPrice] = useState(currentPrice);
    const [direction, setDirection] = useState('above');
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuth();

    const db = getFirestore(app);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) return;

        setLoading(true);
        try {
            await addDoc(collection(db, 'alerts'), {
                userId: currentUser.uid,
                commodity,
                targetPrice: Number(targetPrice),
                direction,
                createdAt: new Date()
            });
            alert(`Alert set for ${commodity} when price goes ${direction} ₹${targetPrice}`);
            onClose();
        } catch (err) {
            console.error(err);
            alert('Failed to set alert. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px', position: 'relative' }}>
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    <X size={24} />
                </button>

                <h3 style={{ marginTop: 0, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Bell size={20} /> Set Price Alert
                </h3>
                <p style={{ color: 'var(--color-text-light)' }}>
                    Get notified when <strong>{commodity}</strong> hits your target price.
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Target Price (₹)</label>
                        <input
                            type="number"
                            required
                            value={targetPrice}
                            onChange={e => setTargetPrice(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Condition</label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="direction"
                                    value="above"
                                    checked={direction === 'above'}
                                    onChange={() => setDirection('above')}
                                />
                                Base Price Goes Above
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="direction"
                                    value="below"
                                    checked={direction === 'below'}
                                    onChange={() => setDirection('below')}
                                />
                                Drops Below
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Create Alert'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AlertsModal;
