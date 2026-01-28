import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-section">
                    <h3>AgriPrice</h3>
                    <p>Empowering agriculture with data and AI.</p>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/prices">Live Prices</a></li>
                        <li><a href="/predictions">Predictions</a></li>
                        <li><a href="/about">About Us</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact</h4>
                    <p>Email: support@agriprice.com</p>
                    <div className="social-links">
                        <Facebook size={20} />
                        <Twitter size={20} />
                        <Instagram size={20} />
                        <Mail size={20} />
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} AgriPrice Platform. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
