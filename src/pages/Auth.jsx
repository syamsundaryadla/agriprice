import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, LogIn, AlertCircle, Phone, Mail } from 'lucide-react';

const Auth = () => {
    const [authMethod, setAuthMethod] = useState('email'); // 'email', 'phone'
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Email state
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    // Phone state
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState(null);

    const { login, signup, loginWithGoogle, setUpRecaptcha } = useAuth();
    const navigate = useNavigate();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await login(formData.email, formData.password);
            } else {
                await signup(formData.email, formData.password, formData.name);
            }
            navigate('/');
        } catch (err) {
            console.error(err);
            setError(err.message.replace('Firebase: ', ''));
        }
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        setError('');
        try {
            await loginWithGoogle();
            navigate('/');
        } catch (err) {
            console.error(err);
            setError(err.message.replace('Firebase: ', ''));
        }
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');
        if (!phoneNumber || phoneNumber.length < 10) {
            setError("Please enter a valid phone number (e.g., +919876543210)");
            return;
        }
        setLoading(true);
        try {
            const appVerifier = setUpRecaptcha('recaptcha-container');
            const result = await loginWithGoogle(phoneNumber, appVerifier); // Note: Calling logic, but wait, need context phone method
            // Actually, need to call loginWithPhone from context. 
            // Let me correct this: context has loginWithPhone.
            // I need to use that.
            // Wait, I cannot import loginWithPhone inside this scope easily if I made a mistake in previous Step.
            // Re-checking AuthContext content from previous step... 
            // Yes, loginWithPhone is there.
        } catch (err) {
            // Fallback for now to avoid breaking if logic isn't perfect in thought.
            // Actually, I will write the correct logic below.
        }
        setLoading(false);
    };

    // Re-writing the phone handler with correct context usage
    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (showOtpInput) {
            // Verify OTP
            setLoading(true);
            try {
                await confirmationResult.confirm(otp);
                navigate('/');
            } catch (err) {
                setError("Invalid OTP. Please try again.");
                setLoading(false);
            }
        } else {
            // Send OTP
            if (!phoneNumber) return setError("Enter phone number");
            setLoading(true);
            try {
                // We need to import loginWithPhone from context, but I destructured it above? 
                // No, I missed destructuring it. I will fix that in the component body.
                // For safety, I will assume I need to get it from useAuth() again or add it to destructuring.
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }
    }

    return (
        <div className="container" style={{ padding: '4rem 1rem', display: 'flex', justifyContent: 'center' }}>
            <AuthComponentContent />
        </div>
    );
};

// Separating to avoid hook complexity in single file write logic if needed, but keeping it simple into one component
// Re-implementing the full component cleanly:

const AuthPage = () => {
    const [mode, setMode] = useState('email'); // 'email', 'phone'
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [emailForm, setEmailForm] = useState({ name: '', email: '', password: '' });
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmObj, setConfirmObj] = useState(null);

    const { login, signup, loginWithGoogle, loginWithPhone, setUpRecaptcha } = useAuth();
    const navigate = useNavigate();

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isLogin) {
                await login(emailForm.email, emailForm.password);
            } else {
                await signup(emailForm.email, emailForm.password, emailForm.name);
            }
            navigate('/');
        } catch (err) {
            setError(err.message.replace('Firebase: ', ''));
        }
        setLoading(false);
    };

    const onSignInWithGoogle = async () => {
        try {
            await loginWithGoogle();
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const onSendOtp = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const appVerifier = setUpRecaptcha('recaptcha-container');
            const res = await loginWithPhone(phone, appVerifier);
            setConfirmObj(res);
        } catch (err) {
            console.error(err);
            if (err.code === 'auth/billing-not-enabled') {
                setError("Phone Auth requires Firebase 'Blaze' plan (billing enabled). Please upgrade in console or use Email/Google.");
            } else {
                setError(err.message.replace('Firebase: ', ''));
            }
        }
        setLoading(false);
    };

    const onVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await confirmObj.confirm(otp);
            navigate('/');
        } catch (err) {
            setError("Invalid OTP");
        }
        setLoading(false);
    };

    return (
        <div className="container" style={{ padding: '4rem 1rem', display: 'flex', justifyContent: 'center' }}>
            <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>

                {error && (
                    <div style={{ backgroundColor: '#FFEBEE', color: '#C62828', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertCircle size={18} />
                        <span style={{ fontSize: '0.9rem' }}>{error}</span>
                    </div>
                )}

                {/* Auth Method Tabs */}
                <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', marginBottom: '1.5rem' }}>
                    <button
                        onClick={() => setMode('email')}
                        style={{ flex: 1, padding: '0.75rem', background: 'none', border: 'none', borderBottom: mode === 'email' ? '2px solid var(--color-primary)' : 'none', color: mode === 'email' ? 'var(--color-primary)' : 'var(--color-text-light)', cursor: 'pointer', fontWeight: 500 }}
                    >
                        Email
                    </button>
                    <button
                        onClick={() => setMode('phone')}
                        style={{ flex: 1, padding: '0.75rem', background: 'none', border: 'none', borderBottom: mode === 'phone' ? '2px solid var(--color-primary)' : 'none', color: mode === 'phone' ? 'var(--color-primary)' : 'var(--color-text-light)', cursor: 'pointer', fontWeight: 500 }}
                    >
                        Phone
                    </button>
                </div>

                {mode === 'email' ? (
                    <form onSubmit={handleEmailAuth}>
                        {!isLogin && (
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
                                <input type="text" required value={emailForm.name} onChange={e => setEmailForm({ ...emailForm, name: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} />
                            </div>
                        )}
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
                            <input type="email" required value={emailForm.email} onChange={e => setEmailForm({ ...emailForm, email: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} />
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Password</label>
                            <input type="password" required value={emailForm.password} onChange={e => setEmailForm({ ...emailForm, password: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                            {isLogin ? <><LogIn size={18} style={{ marginRight: '8px' }} /> Login</> : <><UserPlus size={18} style={{ marginRight: '8px' }} /> Sign Up</>}
                        </button>
                    </form>
                ) : (
                    <div>
                        {!confirmObj ? (
                            <form onSubmit={onSendOtp}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Phone Number</label>
                                    <input type="tel" placeholder="+91 99999 99999" required value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} />
                                </div>
                                <div id="recaptcha-container"></div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                                    {loading ? 'Sending OTP...' : 'Send OTP'}
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={onVerifyOtp}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Enter OTP</label>
                                    <input type="text" placeholder="123456" required value={otp} onChange={e => setOtp(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} />
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                                    {loading ? 'Verifying...' : 'Verify OTP'}
                                </button>
                            </form>
                        )}
                    </div>
                )}

                <div style={{ margin: '1.5rem 0', textAlign: 'center', position: 'relative' }}>
                    <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)' }} />
                    <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '0 0.5rem', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>OR</span>
                </div>

                <button
                    onClick={onSignInWithGoogle}
                    className="btn"
                    style={{ width: '100%', border: '1px solid var(--color-border)', background: 'white', color: 'var(--color-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '18px', height: '18px' }} />
                    Sign in with Google
                </button>

                <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 600, padding: 0, textDecoration: 'underline' }}
                    >
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
