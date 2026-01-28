import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wheat, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { currentUser, logout } = useAuth();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const isActive = (path) => location.pathname === path ? 'active' : '';

    const handleLogout = async () => {
        try {
            await logout();
            closeMenu();
        } catch (err) {
            console.error("Failed to log out", err);
        }
    }

    return (
        <header className="header">
            <div className="container header-container">
                <Link to="/" className="logo" onClick={closeMenu}>
                    <Wheat className="logo-icon" size={28} />
                    <span>AgriPrice</span>
                </Link>

                <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <Link to="/" className={`nav-link ${isActive('/')}`} onClick={closeMenu}>Home</Link>
                    <Link to="/prices" className={`nav-link ${isActive('/prices')}`} onClick={closeMenu}>Live Prices</Link>
                    <Link to="/predictions" className={`nav-link ${isActive('/predictions')}`} onClick={closeMenu}>Predictions</Link>
                    <Link to="/about" className={`nav-link ${isActive('/about')}`} onClick={closeMenu}>About</Link>
                    <Link to="/contact" className={`nav-link ${isActive('/contact')}`} onClick={closeMenu}>Contact</Link>

                    {currentUser ? (
                        <div className="auth-menu-item" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <Link to="/profile" className="nav-link" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <User size={18} /> Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="auth-btn"
                                style={{ background: '#ef4444' }} /* Red logout button */
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/auth" className="auth-btn" onClick={closeMenu}>
                            <User size={18} /> Login
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
