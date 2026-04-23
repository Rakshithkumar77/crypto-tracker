import { useNavigate } from 'react-router-dom';
import './TradingBots.css';

const BOTS = [
  { id: 1, icon: '⚡', name: 'DCA Bot', desc: 'Dollar-cost average automatically at set intervals.' },
  { id: 2, icon: '📈', name: 'Grid Bot', desc: 'Profit from sideways markets with a grid strategy.' },
  { id: 3, icon: '🌙', name: 'Moon Bot', desc: 'Ride momentum and take profits at peaks.' },
];

export default function TradingBots() {
  const navigate = useNavigate();

  return (
    <div className="bots-page">
      <div className="bots-orb bots-orb--1" />
      <div className="bots-orb bots-orb--2" />

      <div className="bots-container">
        {/* Header */}
        <div className="bots-header">
          <div className="bots-badge">
            <span className="bots-badge__dot" />
            Coming Soon
          </div>
          <h1 className="bots-title">
            Trade while you <span className="bots-title--grad">sleep</span>
          </h1>
          <p className="bots-subtitle">
            Powerful automated trading bots that execute your strategies 24/7 — no coding required.
          </p>
        </div>

        {/* Bot cards */}
        <div className="bots-grid">
          {BOTS.map((bot, i) => (
            <div
              key={bot.id}
              id={`bot-${bot.id}`}
              className="bot-card"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="bot-card__icon">{bot.icon}</div>
              <h3 className="bot-card__name">{bot.name}</h3>
              <p className="bot-card__desc">{bot.desc}</p>
              <div className="bot-card__tag">Coming Soon</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bots-cta-wrap">
          <p className="bots-notify">Be the first to know when bots launch.</p>
          <div className="bots-email-row">
            <input
              id="bot-notify-email"
              type="email"
              placeholder="you@example.com"
              className="bots-email-input"
            />
            <button id="bot-notify-btn" className="bots-notify-btn">
              Notify Me
            </button>
          </div>
          <button
            className="bots-back-btn"
            onClick={() => navigate('/')}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
