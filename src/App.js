import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthForm from './components/AuthForm';
import AddTransaction from './components/AddTransaction';
import SummaryCards from './components/SummaryCards';
import ChartSection from './components/ChartSection';
import TransactionList from './components/TransactionList';

function App() {
  const [token, setToken] = useState(localStorage.getItem('finance_token'));
  const [name, setName] = useState(localStorage.getItem('finance_name'));
  const [transactions, setTransactions] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(prev => !prev);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) return;
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(res.data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      }
    };

    fetchData();
  }, [token, refresh]);

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setName(null);
    setTransactions([]);
  };

  const handleLogin = () => {
    setToken(localStorage.getItem('finance_token'));
    setName(localStorage.getItem('finance_name'));
  };

  if (!token) return <AuthForm onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#845EC2] via-[#2C73D2] to-[#29C7AC] px-4 pb-10 font-sans text-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center py-6">
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              ZentraFi
            </h1>
            <p className="text-white/80 text-sm mt-1">
              Balanced Personal Finance Management
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <span className="text-white/90 mr-4">Welcome, {name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Components */}
        <AddTransaction token={token} onAdd={triggerRefresh} />
        <SummaryCards transactions={transactions} />
        <ChartSection transactions={transactions} />
        <TransactionList token={token} refreshTrigger={refresh} />
      </div>
    </div>
  );
}

export default App;
