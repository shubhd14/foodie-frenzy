import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        'http://localhost:4000/api/admin/login',
        { email, password }
      );

      // ✅ backend se aaya data
      const { token, restaurant } = res.data;

      // ✅ IMPORTANT: localStorage
      localStorage.setItem('adminToken', token);
      localStorage.setItem('restaurantId', restaurant);

      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a120b]">
      <form
        onSubmit={handleLogin}
        className="bg-[#2a1e14] p-8 rounded-xl w-80 space-y-4"
      >
        <h2 className="text-2xl text-amber-400 text-center font-bold">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-500 text-black py-2 rounded font-bold"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
