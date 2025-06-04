import React, { useState } from 'react';
import axios from 'axios';

function AddTransaction({ token, onAdd }) {
  const [form, setForm] = useState({
    type: 'expense',
    category: '',
    amount: '',
    note: '',
    date: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/transactions`, form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setForm({
        type: 'expense',
        category: '',
        amount: '',
        note: '',
        date: ''
      });
      onAdd(); 
    } catch (err) {
      console.error('Error adding transaction:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-10">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Add Transaction</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border border-gray-700 text-black px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-700 text-black px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full border border-gray-300 text-black px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border border-gray-300 text-black px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-bold text-gray-700 mb-1">Note (optional)</label>
        <input
          type="text"
          name="note"
          value={form.note}
          onChange={handleChange}
          className="w-full border border-gray-300 text-black px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg transition"
      >
        Add Transaction
      </button>
    </form>
  );
}

export default AddTransaction;
