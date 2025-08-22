import React, { useState } from 'react';
import { postTransaction } from '../services/api';

function TransactionForm({ token }) {
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState("credit");

    const handleSubmit = async () => {
        await postTransaction({ amount, type }, token);
    };

    return (
        <div>
            <input type="number" value={amount} onChange={e => setAmount(+e.target.value)} />
            <select value={type} onChange={e => setType(e.target.value)}>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
            </select>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default TransactionForm;
