import React from 'react';

const BalanceCard = ({ balance, onTopUp }) => (
  <div style={{ background: '#fff', borderRadius: 12, padding: 32, boxShadow: '0 2px 8px #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
    <div>
      <div style={{ fontSize: 18, color: '#888', marginBottom: 6 }}>Wallet Balance</div>
      <div style={{ fontSize: 36, fontWeight: 800, color: '#1976d2' }}>${balance.toLocaleString()}</div>
    </div>
    <button onClick={onTopUp} style={{ padding: '12px 28px', fontSize: 18, borderRadius: 8, background: '#43e97b', color: '#fff', fontWeight: 700, border: 'none', boxShadow: '0 2px 8px #43e97baa', cursor: 'pointer', transition: 'all 0.2s' }}>
      Top Up
    </button>
  </div>
);

export default BalanceCard;
