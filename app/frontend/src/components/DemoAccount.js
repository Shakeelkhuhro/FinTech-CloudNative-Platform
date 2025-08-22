import React from 'react';

const DemoAccount = ({ onFill }) => (
  <div style={{ margin: '24px 0', textAlign: 'center' }}>
    <button onClick={onFill} style={{ padding: '10px 24px', fontSize: 16, borderRadius: 6, background: '#1976d2', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
      Use Demo Account (demo@fintech.com / demo123)
    </button>
  </div>
);

export default DemoAccount;
