import React from 'react';

const UserProfile = ({ user }) => {
  if (!user) return null;
  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 2px 8px #eee', marginBottom: 24 }}>
      <h3 style={{ marginBottom: 12 }}>User Profile</h3>
      <div><b>Username:</b> {user.username}</div>
      <div><b>Email:</b> {user.email}</div>
      <div><b>Joined:</b> {user.joined}</div>
    </div>
  );
};

export default UserProfile;
