import React, { useState, useEffect } from 'react';
import { getHistory } from '../services/api';
import TransactionForm from './TransactionForm';
import History from './History';

function Dashboard({ token }) {
    const [history, setHistory] = useState([]);

    const fetchHistory = async () => {
        const data = await getHistory(token);
        setHistory(data);
    };

    useEffect(() => { fetchHistory(); }, []);

    return (
        <div>
            <TransactionForm token={token} />
            <History history={history} />
        </div>
    );
}

export default Dashboard;