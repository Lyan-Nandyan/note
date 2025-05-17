import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/login`, {
        email,
        password
      }, {
        withCredentials: true
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate('/');
    } catch (error) {
      setMsg(error.response?.data?.msg || 'Login gagal');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="title">Login</h2>
      <p className="has-text-danger">{msg}</p>
      <form onSubmit={handleLogin}>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
        </div>
        <button type="submit" className="button is-primary mt-3">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
