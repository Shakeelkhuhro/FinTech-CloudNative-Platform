import React, { useState, useEffect } from 'react';
import { getHistory } from '../services/api';
import TransactionForm from './TransactionForm';
import History from './History';
import BalanceCard from './BalanceCard';
import UserProfile from './UserProfile';
import { SpendingChart, TypePieChart } from './Charts';

function Dashboard({ token, onLogout, setNotification }) {
    const [history, setHistory] = useState([]);
    const [balance, setBalance] = useState(1250); // Placeholder, should be calculated
    const [user, setUser] = useState({ username: 'demo@fintech.com', email: 'demo@fintech.com', joined: '2024-01-01' });

    const fetchHistory = async () => {
        const data = await getHistory(token);
        setHistory(data);
        // Calculate balance from history
        let bal = 0;
        if (Array.isArray(data)) {
            data.forEach(tx => {
                if (tx.type === 'credit') bal += Number(tx.amount);
                else if (tx.type === 'debit') bal -= Number(tx.amount);
            });
        }
        setBalance(bal);
    };

    useEffect(() => { fetchHistory(); }, []);

    // Prepare chart data
    const chartData = (() => {
        const months = {};
        history.forEach(tx => {
            const d = new Date(tx.date || Date.now());
            const m = d.toLocaleString('default', { month: 'short' });
            if (!months[m]) months[m] = { month: m, credit: 0, debit: 0 };
            months[m][tx.type] += Number(tx.amount);
        });
        return Object.values(months);
    })();
    const pieData = [
        { type: 'credit', value: history.filter(tx => tx.type === 'credit').reduce((a, b) => a + Number(b.amount), 0) },
        { type: 'debit', value: history.filter(tx => tx.type === 'debit').reduce((a, b) => a + Number(b.amount), 0) },
    ];

    return (
        <div style={{ maxWidth: 900, margin: '40px auto', padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 style={{ fontWeight: 800, color: '#1976d2' }}>Dashboard</h2>
                <button onClick={onLogout} style={{ background: '#fff', color: '#1976d2', border: '1px solid #1976d2', borderRadius: 6, padding: '8px 20px', fontWeight: 700, cursor: 'pointer' }}>Logout</button>
            </div>
            <BalanceCard balance={balance} onTopUp={() => setNotification({ message: 'Top Up feature coming soon!', type: 'success' })} />
            <UserProfile user={user} />
            <SpendingChart data={chartData} />
            <TypePieChart data={pieData} />
            <TransactionForm token={token} onSuccess={fetchHistory} setNotification={setNotification} />
            <History history={history} />
        </div>
    );
}

export default Dashboard;