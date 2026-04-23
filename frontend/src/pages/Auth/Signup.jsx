import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../services/auth.service';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './Auth.css';

export default function Signup() {
  const [form, setForm]     = useState({ email: '', username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { saveAuth }          = useAuth();
  const navigate              = useNavigate();

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      return toast.error('Password must be at least 6 characters.');
    }
    setLoading(true);
    try {
      const res = await signup(form.email, form.username, form.password);
      const { token, user } = res.data.data;
      saveAuth(token, user);
      toast.success(`Account created! Welcome, ${user.username}!`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-orb orb-1" />
      <div className="auth-bg-orb orb-2" />

      <div className="auth-card card animate-fade-in-up">
        <div className="auth-header">
          <div className="auth-logo">₿</div>
          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">Track your favourite coins for free</p>
        </div>

        <form onSubmit={onSubmit} className="auth-form">
          <div className="input-group">
            <label className="input-label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="input-field"
              placeholder="you@example.com"
              value={form.email}
              onChange={onChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              className="input-field"
              placeholder="satoshi123"
              value={form.username}
              onChange={onChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="input-field"
              placeholder="Min 6 characters"
              value={form.password}
              onChange={onChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full btn-lg" disabled={loading}>
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">Sign in →</Link>
        </p>
      </div>
    </div>
  );
}
