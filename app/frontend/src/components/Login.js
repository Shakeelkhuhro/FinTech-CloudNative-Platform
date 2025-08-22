
import React, { useState } from 'react';
import { login } from '../services/api';
import DemoAccount from './DemoAccount';

function Login({ setToken, onBack }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch('http://localhost:8081/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok && data.token) {
                setToken(data.token);
            } else {
                setError(data.error || data.message || 'Invalid username or password');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        }
        setLoading(false);
    };

    const fillDemo = () => {
        setUsername('demo@fintech.com');
        setPassword('demo123');
    };

    return (
        <div style={{ maxWidth: 350, margin: '60px auto', padding: 24, border: '1px solid #eee', borderRadius: 8, boxShadow: '0 2px 8px #eee', fontFamily: 'Inter, Roboto, sans-serif' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 24, fontWeight: 800, color: '#1976d2' }}>FinTech Login</h2>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', marginBottom: 6 }}>Username</label>
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', fontFamily: 'inherit' }}
                        autoFocus
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', marginBottom: 6 }}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', fontFamily: 'inherit' }}
                    />
                </div>
                {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
                <button
                    type="submit"
                    style={{ width: '100%', padding: 10, borderRadius: 4, background: '#1976d2', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: 16, fontFamily: 'inherit' }}
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <DemoAccount onFill={fillDemo} />
            <button onClick={onBack} style={{ marginTop: 8, background: 'none', border: 'none', color: '#1976d2', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit' }}>Back</button>
        </div>
    );
}

export default Login;