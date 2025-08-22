import React from 'react';

function History({ history }) {
	return (
		<div>
			<h3>Transaction History</h3>
			<ul>
				{history && history.length > 0 ? history.map((tx, idx) => (
					<li key={tx.id || idx}>
						{tx.type}: ${'{'}tx.amount{'}'}
					</li>
				)) : <li>No transactions found.</li>}
			</ul>
		</div>
	);
}

export default History;
