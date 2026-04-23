import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/auth.service';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './Auth.css';

export default function Login() {
  const [form, setForm]     = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { saveAuth }          = useAuth();
  const navigate              = useNavigate();

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(form.email, form.password);
      const { token, user } = res.data.data;
      saveAuth(token, user);
      toast.success(`Welcome back, ${user.username}!`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.');
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
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to your CryptoTrack account</p>
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
            <label className="input-label" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={form.password}
              onChange={onChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full btn-lg" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/signup" className="auth-link">Create one →</Link>
        </p>
      </div>
    </div>
  );
}
