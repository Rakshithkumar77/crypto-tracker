import { useNavigate } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="landing-footer">
      <div className="landing-footer__inner">

        {/* Column 1 — Brand */}
        <div className="footer-col footer-col--brand">
          <div className="footer-logo">
            <span className="footer-logo__icon">₿</span>
            <span className="footer-logo__name">CryptoTrack</span>
          </div>
          <p className="footer-tagline">
            Best Crypto Portfolio Tracker
          </p>
          <p className="footer-desc">
            Simple, secure cryptocurrency portfolio management
          </p>
        </div>

        {/* Column 2 — Features */}
        <div className="footer-col">
          <h4 className="footer-heading">Features</h4>
          <ul className="footer-links">
            <li><button className="footer-link" onClick={() => navigate('/dashboard')}>Portfolio Tracking</button></li>
            <li><button className="footer-link">Cloud Sync</button></li>
            <li><button className="footer-link" onClick={() => navigate('/trading-bots')}>Trading Bots</button></li>
            <li><button className="footer-link">Exchange Integration</button></li>
          </ul>
        </div>

        {/* Column 3 — Resources */}
        <div className="footer-col">
          <h4 className="footer-heading">Resources</h4>
          <ul className="footer-links">
            <li><button className="footer-link">Privacy Policy</button></li>
            <li><button className="footer-link">Terms of Service</button></li>
            <li><span className="footer-coming-soon">Coming Soon: Mobile App</span></li>
          </ul>
        </div>

        {/* Column 4 — Get Started */}
        <div className="footer-col">
          <h4 className="footer-heading">Get Started</h4>
          <ul className="footer-links">
            <li><button className="footer-link footer-link--accent" onClick={() => navigate('/dashboard')}>Create Portfolio</button></li>
            <li><button className="footer-link" onClick={() => navigate('/login')}>Restore Portfolio</button></li>
          </ul>
        </div>
      </div>

      <div className="landing-footer__bottom">
        <span>© {year} CryptoTrack. All rights reserved.</span>
      </div>
    </footer>
  );
}
