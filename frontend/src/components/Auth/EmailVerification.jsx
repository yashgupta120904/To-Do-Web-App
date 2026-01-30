import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const EmailVerification = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { currentUser, resendVerificationEmail, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser?.emailVerified) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const handleResend = async () => {
        setLoading(true);
        setMessage('');

        try {
            await resendVerificationEmail();
            setMessage('Verification email sent! Please check your inbox.');
        } catch (err) {
            setMessage('Error sending email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="verification-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>

                <h1>Verify Your Email</h1>
                <p className="auth-subtitle">
                    We've sent a verification email to <strong>{currentUser?.email}</strong>
                </p>
                <p className="verification-text">
                    Please check your inbox and click the verification link to activate your account.
                </p>

                {message && <div className="info-message">{message}</div>}

                <button onClick={handleResend} className="btn btn-primary" disabled={loading}>
                    {loading ? 'Sending...' : 'Resend Verification Email'}
                </button>

                <button onClick={handleLogout} className="btn btn-secondary">
                    Back to Login
                </button>
            </div>
        </div>
    );
};

export default EmailVerification;
