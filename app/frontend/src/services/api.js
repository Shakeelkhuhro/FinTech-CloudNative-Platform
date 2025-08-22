const API_URL = "http://localhost:8081"; // User Service base

export const login = async (username, password) => {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    return res.json();
};

export const postTransaction = async (txn, token) => {
    const res = await fetch("http://localhost:8082/transaction", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(txn),
    });
    return res.json();
};

export const getHistory = async (token) => {
    const res = await fetch("http://localhost:8083/history", {
        headers: { "Authorization": token }
    });
    return res.json();
};
