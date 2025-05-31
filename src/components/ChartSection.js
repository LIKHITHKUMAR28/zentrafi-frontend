import React from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

const COLORS = ['#00C49F', '#FF8042', '#FFBB28', '#0088FE', '#AF19FF'];

function ChartSection({ transactions }) {
  const categoryTotals = transactions.reduce((acc, txn) => {
    if (txn.type === 'expense') {
      acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
    }
    return acc;
  }, {});

  const pieData = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category,
    value: amount
  }));

  const monthlyTotals = transactions.reduce((acc, txn) => {
    const month = new Date(txn.date).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + txn.amount;
    return acc;
  }, {});

  const barData = Object.entries(monthlyTotals).map(([month, amount]) => ({
    month,
    amount
  }));

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Spending Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        { }
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-md font-medium mb-2">Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        { }
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-md font-medium mb-2">Monthly Totals</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ChartSection;
