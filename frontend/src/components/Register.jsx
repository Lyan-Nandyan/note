import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    gender: 'Male',
    password: ''
  });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/register`, form);
      navigate('/login');
    } catch (error) {
      setMsg(error.response?.data?.msg || 'Registrasi gagal');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="title">Register</h2>
      <p className="has-text-danger">{msg}</p>
      <form onSubmit={handleRegister}>
        <div className="field">
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            className="input"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label className="label">Gender</label>
          <div className="select">
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="button is-success mt-3">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
