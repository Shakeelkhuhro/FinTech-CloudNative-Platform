
import React, { useState } from 'react';

function History({ history }) {
	const [sort, setSort] = useState({ field: 'date', dir: 'desc' });
	const [filter, setFilter] = useState('');
	const [page, setPage] = useState(1);
	const pageSize = 5;

	// Filter and sort
	let filtered = history || [];
	if (filter) {
		filtered = filtered.filter(tx =>
			tx.type.toLowerCase().includes(filter.toLowerCase()) ||
			(tx.notes || '').toLowerCase().includes(filter.toLowerCase())
		);
	}
	filtered = filtered.sort((a, b) => {
		if (sort.field === 'amount') return sort.dir === 'asc' ? a.amount - b.amount : b.amount - a.amount;
		if (sort.field === 'type') return sort.dir === 'asc' ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type);
		// Default: date
		return sort.dir === 'asc' ? new Date(a.date || 0) - new Date(b.date || 0) : new Date(b.date || 0) - new Date(a.date || 0);
	});
	const totalPages = Math.ceil(filtered.length / pageSize);
	const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

	const setSortField = (field) => {
		setSort(s => ({ field, dir: s.field === field && s.dir === 'asc' ? 'desc' : 'asc' }));
	};

	return (
		<div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 2px 8px #eee', marginBottom: 24 }}>
			<h3 style={{ marginBottom: 16 }}>Transaction History</h3>
			<input
				value={filter}
				onChange={e => { setFilter(e.target.value); setPage(1); }}
				placeholder="Filter by type or notes..."
				style={{ marginBottom: 12, padding: 6, borderRadius: 4, border: '1px solid #ccc', width: 220 }}
			/>
			<table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 12 }}>
				<thead>
					<tr style={{ background: '#f6fafd' }}>
						<th style={{ cursor: 'pointer' }} onClick={() => setSortField('date')}>Date {sort.field === 'date' ? (sort.dir === 'asc' ? '▲' : '▼') : ''}</th>
						<th style={{ cursor: 'pointer' }} onClick={() => setSortField('type')}>Type {sort.field === 'type' ? (sort.dir === 'asc' ? '▲' : '▼') : ''}</th>
						<th style={{ cursor: 'pointer' }} onClick={() => setSortField('amount')}>Amount {sort.field === 'amount' ? (sort.dir === 'asc' ? '▲' : '▼') : ''}</th>
						<th>Notes</th>
					</tr>
				</thead>
				<tbody>
					{paged.length > 0 ? paged.map((tx, idx) => (
						<tr key={tx.id || idx} style={{ borderBottom: '1px solid #eee' }}>
							<td>{tx.date ? new Date(tx.date).toLocaleString() : '-'}</td>
							<td style={{ color: tx.type === 'credit' ? '#43e97b' : '#e91e63', fontWeight: 600 }}>{tx.type}</td>
							<td>${Number(tx.amount).toLocaleString()}</td>
							<td>{tx.notes || ''}</td>
						</tr>
					)) : <tr><td colSpan={4} style={{ textAlign: 'center', color: '#888' }}>No transactions found.</td></tr>}
				</tbody>
			</table>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<span>Page {page} of {totalPages || 1}</span>
				<div>
					<button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ marginRight: 8 }}>Prev</button>
					<button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
				</div>
			</div>
		</div>
	);
}

export default History;
