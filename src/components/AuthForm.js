import React, { useState } from 'react';
import axios from 'axios';

function AuthForm({ onLogin }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const toggleMode = () => {
    setError('');
    setIsRegister(!isRegister);
    setForm({ name: '', email: '', password: '' });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const url = isRegister
        ? `${process.env.REACT_APP_API_URL}/api/users/register`
        : `${process.env.REACT_APP_API_URL}/api/users/login`;

      const res = await axios.post(url, form);

      localStorage.setItem('finance_token', res.data.token);
      localStorage.setItem('finance_name', res.data.name);
      onLogin();
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please check credentials or try again later.');
      }
      console.error('Login/Register error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#845EC2] via-[#2C73D2] to-[#29C7AC] px-4 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-xl text-gray-800"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isRegister ? 'Register to ZentraFi' : 'Login to ZentraFi'}
        </h2>

        {error && <p className="text-red-600 mb-3 text-center">{error}</p>}

        {isRegister && (
          <>
            <label className="block text-sm mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              required
            />
          </>
        )}

        <label className="block text-sm mb-1 font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
          required
        />

        <label className="block text-sm mb-1 font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
        >
          {isRegister ? 'Register' : 'Login'}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isRegister ? 'Already have an account?' : 'Don’t have an account?'}{' '}
          <button type="button" className="text-indigo-600 underline" onClick={toggleMode}>
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </form>
    </div>
  );
}

export default AuthForm;
