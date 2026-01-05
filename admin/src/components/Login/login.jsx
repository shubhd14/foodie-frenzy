import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // ✅ correct

    if (email === 'admin@foodie.com' && password === 'Admin@Foodie#2026!') {
      localStorage.setItem('adminToken', 'true'); // ✅ SAME KEY EVERYWHERE
      navigate('/');
    } else {
      alert('Invalid Admin Credentials');
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
          className="w-full bg-amber-500 text-black py-2 rounded font-bold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
