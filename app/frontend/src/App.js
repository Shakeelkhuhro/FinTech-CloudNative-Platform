
import React, { useState, useEffect } from "react";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Notification from "./components/Notification";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [view, setView] = useState(token ? "dashboard" : "landing");
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const handleLogin = (tok) => {
    setToken(tok);
    setView("dashboard");
    setNotification({ message: "Login successful!", type: "success" });
  };

  const handleLogout = () => {
    setToken(null);
    setView("landing");
    setNotification({ message: "Logged out.", type: "success" });
  };

  return (
    <div style={{ fontFamily: 'Inter, Roboto, sans-serif', minHeight: '100vh', background: '#f6fafd' }}>
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: "", type: "" })} />
      {view === "landing" && <Landing onLogin={() => setView("login")} />}
      {view === "login" && <Login setToken={handleLogin} onBack={() => setView("landing")} />}
      {view === "dashboard" && token && <Dashboard token={token} onLogout={handleLogout} setNotification={setNotification} />}
    </div>
  );
}

export default App;
