import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for contacting us! We will get back to you shortly.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="container" style={{ padding: '3rem 1rem' }}>
            <h1 style={{ color: 'var(--color-primary)', textAlign: 'center', marginBottom: '3rem' }}>Get in Touch</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                {/* Contact Info */}
                <div>
                    <h2 style={{ marginTop: 0 }}>Contact Information</h2>
                    <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>
                        Have questions about our predictions or want to partner with us? Reach out using the details below or fill out the form.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ background: '#E8F5E9', padding: '0.75rem', borderRadius: '50%', color: 'var(--color-primary)' }}><Mail size={24} /></div>
                            <div>
                                <div style={{ fontWeight: 600 }}>Email</div>
                                <div style={{ color: 'var(--color-text-light)' }}>support@agriprice.com</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ background: '#E8F5E9', padding: '0.75rem', borderRadius: '50%', color: 'var(--color-primary)' }}><Phone size={24} /></div>
                            <div>
                                <div style={{ fontWeight: 600 }}>Phone</div>
                                <div style={{ color: 'var(--color-text-light)' }}>+91 98765 43210</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ background: '#E8F5E9', padding: '0.75rem', borderRadius: '50%', color: 'var(--color-primary)' }}><MapPin size={24} /></div>
                            <div>
                                <div style={{ fontWeight: 600 }}>Headquarters</div>
                                <div style={{ color: 'var(--color-text-light)' }}>AgriTech Park, New Delhi, India</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="card">
                    <h3 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Send us a Message</h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                                placeholder="Your Name"
                            />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                                placeholder="you@example.com"
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
                            <textarea
                                rows="4"
                                required
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontFamily: 'inherit' }}
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', gap: '0.5rem' }}>
                            <Send size={18} /> Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
