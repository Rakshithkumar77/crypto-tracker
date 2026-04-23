import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingNavbar.css';

export default function LandingNavbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="landing-nav" role="navigation" aria-label="Main navigation">
      {/* Logo */}
      <div className="landing-nav__logo" onClick={() => navigate('/')} role="button" tabIndex={0}>
        <div className="landing-nav__icon">₿</div>
        <span className="landing-nav__brand">CryptoTrack</span>
      </div>

      {/* Desktop links */}
      <div className="landing-nav__links">
        <button id="nav-signin"       className="landing-nav__link" onClick={() => navigate('/login')}>Sign In →</button>
        <button id="nav-pricing"      className="landing-nav__link" onClick={() => navigate('/pricing')}>Pricing →</button>
        <button id="nav-trading-bots" className="landing-nav__link" onClick={() => navigate('/trading-bots')}>Trading Bots →</button>
        <button id="nav-faq"          className="landing-nav__link" onClick={() => navigate('/faq')}>FAQ →</button>
      </div>

      {/* Right — profile placeholder */}
      <div className="landing-nav__right">
        <div className="landing-nav__avatar" title="Profile" aria-label="User profile">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </div>
        {/* Hamburger */}
        <button
          className="landing-nav__hamburger"
          onClick={() => setMenuOpen(p => !p)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
          <span className={menuOpen ? 'open' : ''} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="landing-nav__mobile">
          <button className="landing-nav__mobile-link" onClick={() => { navigate('/login');        setMenuOpen(false); }}>Sign In</button>
          <button className="landing-nav__mobile-link" onClick={() => { navigate('/pricing');      setMenuOpen(false); }}>Pricing</button>
          <button className="landing-nav__mobile-link" onClick={() => { navigate('/trading-bots'); setMenuOpen(false); }}>Trading Bots</button>
          <button className="landing-nav__mobile-link" onClick={() => { navigate('/faq');          setMenuOpen(false); }}>FAQ</button>
        </div>
      )}
    </nav>
  );
}
