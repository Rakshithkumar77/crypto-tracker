import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './Navbar.css';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully.');
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="navbar-logo">₿</span>
          <span className="navbar-title">CryptoTrack</span>
        </Link>

        <div className="navbar-links">
          <Link to="/dashboard" className="navbar-link">Markets</Link>
          <Link to="/watchlist" className="navbar-link">Watchlist</Link>
        </div>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <>
              <span className="navbar-user">👤 {user?.username}</span>
              <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">Log In</Link>
              <Link to="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="navbar-hamburger" onClick={() => setMenuOpen((p) => !p)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="navbar-mobile-menu animate-fade-in">
          <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="mobile-link">Markets</Link>
          <Link to="/watchlist" onClick={() => setMenuOpen(false)} className="mobile-link">Watchlist</Link>
          {isAuthenticated ? (
            <button className="btn btn-secondary btn-sm w-full" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="btn btn-ghost btn-sm w-full">Log In</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="btn btn-primary btn-sm w-full">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
