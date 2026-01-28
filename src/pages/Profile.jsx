import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { app } from '../firebase';
import { User, Bell, Trash2 } from 'lucide-react';

const Profile = () => {
    const { currentUser } = useAuth();
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const db = getFirestore(app);

    const fetchAlerts = async () => {
        if (!currentUser) return;
        try {
            const q = query(collection(db, 'alerts'), where('userId', '==', currentUser.uid));
            const querySnapshot = await getDocs(q);
            const loadedAlerts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAlerts(loadedAlerts);
        } catch (err) {
            console.error("Error fetching alerts:", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAlerts();
    }, [currentUser]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this alert?')) {
            await deleteDoc(doc(db, 'alerts', id));
            setAlerts(alerts.filter(a => a.id !== id));
        }
    };

    if (!currentUser) return <div className="container" style={{ padding: '4rem' }}>Please login to view profile.</div>;

    return (
        <div className="container" style={{ padding: '3rem 1rem' }}>
            <div className="card" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ background: '#E8F5E9', padding: '1rem', borderRadius: '50%', color: 'var(--color-primary)' }}>
                        <User size={32} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, color: 'var(--color-text)' }}>{currentUser.displayName || 'User'}</h2>
                        <p style={{ margin: 0, color: 'var(--color-text-light)' }}>{currentUser.email}</p>
                    </div>
                </div>

                <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0' }}>Data Source Settings</h4>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="text"
                            placeholder="Enter data.gov.in API Key"
                            style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                            defaultValue={localStorage.getItem('agri_api_key') || ''}
                            id="apiKeyInput"
                        />
                        <button
                            onClick={() => {
                                const key = document.getElementById('apiKeyInput').value;
                                localStorage.setItem('agri_api_key', key);
                                alert('API Key Saved! Go to Live Prices to see real data.');
                            }}
                            className="btn btn-outline"
                            style={{ fontSize: '0.9rem' }}
                        >
                            Save Key
                        </button>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginTop: '0.5rem' }}>
                        Use key from data.gov.in or leave empty to use default test key.
                    </p>
                </div>
            </div>

            <h3 style={{ borderBottom: '2px solid var(--color-primary)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bell size={20} /> Your Active Alerts
            </h3>

            {loading ? (
                <p>Loading alerts...</p>
            ) : alerts.length > 0 ? (
                <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
                    {alerts.map(alert => (
                        <div key={alert.id} className="card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>{alert.commodity}</strong>
                                <div style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                                    Target: ₹{alert.targetPrice} ({alert.direction === 'above' ? 'Above' : 'Below'})
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(alert.id)}
                                style={{ background: '#FFEBEE', color: '#C62828', border: 'none', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}
                                title="Delete Alert"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ color: 'var(--color-text-light)', fontStyle: 'italic', marginTop: '1rem' }}>
                    No active alerts. Go to Live Prices to set one.
                </p>
            )}
        </div>
    );
};

export default Profile;
