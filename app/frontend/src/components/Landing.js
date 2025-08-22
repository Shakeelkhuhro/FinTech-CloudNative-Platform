import React from 'react';

const Landing = ({ onLogin }) => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1976d2 0%, #43e97b 100%)', color: '#fff' }}>
    <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16, fontFamily: 'Inter, Roboto, sans-serif' }}>
      FinTech Wallet
    </h1>
    <p style={{ fontSize: 22, maxWidth: 400, textAlign: 'center', marginBottom: 32 }}>
      Manage your money smartly. Track your balance, view history, and make transactions securely.
    </p>
    <button onClick={onLogin} style={{ padding: '14px 36px', fontSize: 20, borderRadius: 8, background: '#fff', color: '#1976d2', fontWeight: 700, border: 'none', boxShadow: '0 2px 8px #1976d2aa', cursor: 'pointer', transition: 'all 0.2s' }}>
      Login
    </button>
  </div>
);

export default Landing;
