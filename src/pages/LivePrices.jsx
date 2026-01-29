import React, { useState, useEffect } from 'react';
import PriceCard from '../components/PriceCard';
import { Filter, RefreshCw } from 'lucide-react';
import { fetchLivePrices } from '../services/PriceService';

const LivePrices = () => {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterLocation, setFilterLocation] = useState('All');
    const [activeChip, setActiveChip] = useState('All');

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await fetchLivePrices();
            setPrices(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const filteredPrices = prices.filter(item =>
        item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterLocation === 'All' || item.location.includes(filterLocation))
    );

    const filterChips = ['All', 'Wheat', 'Rice', 'Soybean', 'Cotton', 'Mustard'];

    return (
        <div className="container" style={{ padding: '3rem 1.5rem' }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                    Live Market Prices for Crops Across India
                </h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                    Access real-time Mandi rates with high-precision tracking and trend analysis.
                </p>
            </header>

            <div className="dashboard-controls" style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '24px',
                boxShadow: 'var(--shadow-soft)',
                marginBottom: '3rem',
                border: '1px solid var(--color-border)'
            }}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
                        <input
                            type="text"
                            placeholder="Search by crop, Mandi, or state..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem 1rem 1rem 3rem',
                                borderRadius: '100px',
                                border: '1px solid var(--color-border)',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                        <Filter size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                    </div>

                    <button
                        onClick={loadData}
                        className="btn-agri btn-agri-outline"
                        style={{ padding: '0.85rem 1.5rem' }}
                    >
                        <RefreshCw size={18} className={loading ? 'spin' : ''} />
                        Update Live Rates
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {filterChips.map(chip => (
                        <button
                            key={chip}
                            onClick={() => { setActiveChip(chip); setSearchTerm(chip === 'All' ? '' : chip); }}
                            style={{
                                padding: '8px 20px',
                                borderRadius: '100px',
                                border: '1px solid',
                                borderColor: activeChip === chip ? 'var(--color-primary)' : 'var(--color-border)',
                                background: activeChip === chip ? 'var(--color-primary)' : 'transparent',
                                color: activeChip === chip ? 'white' : 'var(--color-text-muted)',
                                fontWeight: '500',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {chip}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="premium-card" style={{ height: '180px', opacity: 0.5 }}>
                            <div className="skeleton-pulse" style={{ width: '60px', height: '60px', borderRadius: '16px', background: '#eee' }}></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {filteredPrices.length > 0 ? (
                        filteredPrices.map((item, idx) => (
                            <PriceCard key={item.id || idx} {...item} />
                        ))
                    ) : (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem 0' }}>
                            <h2 style={{ color: 'var(--color-text-muted)' }}>No Data Found</h2>
                            <p>Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            )}

            <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .spin { animation: spin 1s linear infinite; }
                .skeleton-pulse {
                    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                    background-size: 200% 100%;
                    animation: pulse 1.5s infinite;
                }
                @keyframes pulse { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
            `}</style>
        </div>
    );
};

export default LivePrices;
