import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingNavbar from '../../components/LandingNavbar/LandingNavbar';
import Footer from '../../components/Footer/Footer';
import MagicRings from '../../components/MagicRings/MagicRings';
import './Landing.css';

/* ── Star Canvas ──────────────────────────────── */
function StarCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let W, H;
    let stars = [];

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    const createStars = () => {
      stars = Array.from({ length: 180 }, () => ({
        x:     Math.random() * W,
        y:     Math.random() * H,
        r:     Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.7 + 0.1,
        speed: Math.random() * 0.3 + 0.05,
        dir:   Math.random() > 0.5 ? 1 : -1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        s.alpha += s.speed * 0.012 * s.dir;
        if (s.alpha >= 0.9 || s.alpha <= 0.05) s.dir *= -1;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 160, 255, ${s.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };

    resize();
    createStars();
    draw();

    window.addEventListener('resize', () => { resize(); createStars(); });
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="landing-stars" aria-hidden="true" />;
}

/* ── Feature Card ─────────────────────────────── */
function FeatureCard({ icon, title, delay }) {
  return (
    <div className="feature-card" style={{ animationDelay: delay }}>
      <div className="feature-card__icon">{icon}</div>
      <p className="feature-card__text">{title}</p>
    </div>
  );
}

/* ── Landing Page ─────────────────────────────── */
export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* Animated star background */}
      <StarCanvas />

      {/* Ambient glow orbs */}
      <div className="landing-orb landing-orb--1" aria-hidden="true" />
      <div className="landing-orb landing-orb--2" aria-hidden="true" />
      <div className="landing-orb landing-orb--3" aria-hidden="true" />

      {/* Magic Rings */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <MagicRings
          color="#A855F7"
          colorTwo="#06b6d4"
          ringCount={3}
          speed={1.5}
          attenuation={10}
          lineThickness={2}
          baseRadius={0.35}
          radiusStep={0.1}
          scaleRate={0.1}
          opacity={0.8}
          blur={0}
          noiseAmount={0.1}
          rotation={0}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={true}
          mouseInfluence={0.1}
          hoverScale={1.2}
          parallax={0.05}
          clickBurst={true}
        />
      </div>

      {/* Navbar */}
      <LandingNavbar />

      {/* ── Hero ───────────────────────────────────── */}
      <section className="landing-hero" aria-label="Hero section">
        <div className="hero-content">

          {/* Badge */}
          <div className="hero-badge animate-in" style={{ animationDelay: '0.1s' }}>
            <span className="hero-badge__dot" />
            Live market data · Real-time tracking
          </div>

          {/* Logo icon */}
          <div className="hero-logo-wrap animate-in" style={{ animationDelay: '0.2s' }}>
            <div className="hero-logo">₿</div>
            <div className="hero-logo-ring" />
            <div className="hero-logo-ring hero-logo-ring--2" />
          </div>

          {/* Title */}
          <h1 className="hero-title animate-in" style={{ animationDelay: '0.3s' }}>
            Crypto<span className="hero-title--gradient">Track</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle animate-in" style={{ animationDelay: '0.4s' }}>
            Your portfolio. Your way.
          </p>

          {/* CTA Buttons */}
          <div className="hero-ctas animate-in" style={{ animationDelay: '0.55s' }}>
            <button
              id="btn-get-started"
              className="btn-glow"
              onClick={() => navigate('/dashboard')}
            >
              <span className="btn-glow__shine" />
              Get Started
              <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <button
              id="btn-begin"
              className="btn-outline"
              onClick={() => navigate('/dashboard')}
            >
              Begin →
            </button>
          </div>

          {/* Social proof */}
          <p className="hero-proof animate-in" style={{ animationDelay: '0.7s' }}>
            Trusted by <strong>10,000+</strong> crypto enthusiasts worldwide
          </p>
        </div>
      </section>

      {/* ── Features ───────────────────────────────── */}
      <section className="landing-features" aria-label="Feature highlights">
        <FeatureCard
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          }
          title="Your data is always secure."
          delay="0.1s"
        />
        <FeatureCard
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          }
          title="Set up in seconds."
          delay="0.2s"
        />
        <FeatureCard
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          }
          title="Trade while you sleep."
          delay="0.3s"
        />
      </section>

      {/* ── Nav Links Section (matches reference image) ── */}
      <section className="landing-nav-links" aria-label="Quick navigation">
        <button className="nav-pill" onClick={() => navigate('/login')}>Sign In →</button>
        <button className="nav-pill" onClick={() => navigate('/pricing')}>Pricing →</button>
        <button className="nav-pill" onClick={() => navigate('/trading-bots')}>Trading Bots →</button>
        <button className="nav-pill" onClick={() => navigate('/faq')}>FAQ →</button>
      </section>

      {/* ── Subtitle band ─────────────────────────── */}
      <div className="landing-band">
        <p className="landing-band__text">Your portfolio. Your way.</p>
      </div>

      {/* ── Footer ───────────────────────────────── */}
      <Footer />
    </div>
  );
}
