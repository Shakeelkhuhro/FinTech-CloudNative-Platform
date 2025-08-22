import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#1976d2', '#43e97b', '#ff9800', '#e91e63', '#00bcd4'];

export function SpendingChart({ data }) {
  // data: [{ month: 'Jan', credit: 100, debit: 50 }, ...]
  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 2px 8px #eee', marginBottom: 24 }}>
      <h3>Monthly Spending/Earnings</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="credit" fill="#43e97b" name="Credit" />
          <Bar dataKey="debit" fill="#1976d2" name="Debit" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TypePieChart({ data }) {
  // data: [{ type: 'credit', value: 300 }, { type: 'debit', value: 200 }]
  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 2px 8px #eee', marginBottom: 24 }}>
      <h3>By Type</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="type" cx="50%" cy="50%" outerRadius={80} label>
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
