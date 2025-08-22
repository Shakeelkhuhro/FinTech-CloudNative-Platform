
import React, { useState } from 'react';
import { postTransaction } from '../services/api';

function TransactionForm({ token, onSuccess, setNotification }) {
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState("credit");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await postTransaction({ amount, type, notes }, token);
            setNotification && setNotification({ message: 'Transaction Successful', type: 'success' });
            setAmount(0);
            setType('credit');
            setNotes("");
            onSuccess && onSuccess();
        } catch {
            setNotification && setNotification({ message: 'Transaction Failed', type: 'error' });
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 2px 8px #eee', marginBottom: 24, display: 'flex', gap: 12, alignItems: 'center' }}>
            <input type="number" value={amount} min={0} step={0.01} onChange={e => setAmount(+e.target.value)} placeholder="Amount" style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', width: 100 }} required />
            <select value={type} onChange={e => setType(e.target.value)} style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
            </select>
            <input type="text" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes (optional)" style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', flex: 1 }} />
            <button type="submit" disabled={loading} style={{ padding: '10px 24px', borderRadius: 6, background: '#1976d2', color: '#fff', fontWeight: 700, border: 'none', fontSize: 16 }}>{loading ? 'Processing...' : 'Submit'}</button>
        </form>
    );
}

export default TransactionForm;
