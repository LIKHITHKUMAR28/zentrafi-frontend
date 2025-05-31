import React from 'react';

function SummaryCards({ transactions }) {
  const income = transactions
    .filter(txn => txn.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expense = transactions
    .filter(txn => txn.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
        <h4 className="text-sm font-semibold text-gray-500 mb-1">Income</h4>
        <p className="text-2xl font-bold text-green-600">₹{income}</p>
      </div>
      <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
        <h4 className="text-sm font-semibold text-gray-500 mb-1">Expense</h4>
        <p className="text-2xl font-bold text-red-600">₹{expense}</p>
      </div>
      <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
        <h4 className="text-sm font-semibold text-gray-500 mb-1">Balance</h4>
        <p className="text-2xl font-bold text-blue-600">₹{balance}</p>
      </div>
    </div>
  );
}

export default SummaryCards;
