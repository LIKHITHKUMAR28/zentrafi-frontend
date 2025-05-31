import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TransactionList({ token, refreshTrigger }) {
  const [transactions, setTransactions] = useState([]);

  
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (!token) return;
        const res = await axios.get('http://localhost:5000/api/transactions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(res.data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      }
    };

    fetchTransactions();
  }, [token, refreshTrigger]); 

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setTransactions(prev => prev.filter(txn => txn._id !== id));
    } catch (err) {
      console.error('Error deleting transaction:', err);
    }
  };

  
  const filteredTransactions = transactions.filter(txn => {
    const txnDate = new Date(txn.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return (
      (filterType === 'all' || txn.type === filterType) &&
      (filterCategory === '' || txn.category.toLowerCase().includes(filterCategory.toLowerCase())) &&
      (minAmount === '' || txn.amount >= parseFloat(minAmount)) &&
      (maxAmount === '' || txn.amount <= parseFloat(maxAmount)) &&
      (!start || txnDate >= start) &&
      (!end || txnDate <= end)
    );
  });

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6 text-white">Your Transactions</h2>

      { }
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-white mb-1">Type</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-3 py-2 rounded bg-white text-gray-800"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-white mb-1">Category</label>
          <input
            type="text"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            placeholder="e.g. groceries"
            className="w-full px-3 py-2 rounded bg-white text-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm text-white mb-1">Min Amount</label>
          <input
            type="number"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            className="w-full px-3 py-2 rounded bg-white text-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm text-white mb-1">Max Amount</label>
          <input
            type="number"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            className="w-full px-3 py-2 rounded bg-white text-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm text-white mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 rounded bg-white text-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm text-white mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 rounded bg-white text-gray-800"
          />
        </div>
      </div>

      { }
      {filteredTransactions.length === 0 ? (
        <p className="text-white/80">No transactions match your filters.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white/90 shadow-lg backdrop-blur-md">
          <table className="w-full min-w-[600px] text-sm text-gray-800">
            <thead className="bg-indigo-100/80 text-left text-indigo-800 font-semibold">
              <tr>
                <th className="p-3">Type</th>
                <th className="p-3">Category</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
                <th className="p-3">Note</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(txn => (
                <tr
                  key={txn._id}
                  className="border-t hover:bg-indigo-50/60 transition duration-150"
                >
                  <td className="p-3 capitalize">{txn.type}</td>
                  <td className="p-3">{txn.category}</td>
                  <td className="p-3">₹{txn.amount}</td>
                  <td className="p-3">{new Date(txn.date).toLocaleDateString()}</td>
                  <td className="p-3">{txn.note || '-'}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDelete(txn._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-xs transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TransactionList;
