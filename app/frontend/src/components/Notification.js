import React from 'react';

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;
  return (
    <div style={{
      position: 'fixed', top: 24, right: 24, zIndex: 1000,
      background: type === 'error' ? '#ff5252' : '#43e97b',
      color: '#fff', padding: '16px 32px', borderRadius: 8,
      boxShadow: '0 2px 8px #0002', fontWeight: 600, fontSize: 18,
      display: 'flex', alignItems: 'center', gap: 16
    }}>
      <span>{message}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>&times;</button>
    </div>
  );
};

export default Notification;
