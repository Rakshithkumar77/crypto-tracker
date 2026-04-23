import { useState } from 'react';
import './FAQ.css';

const FAQS = [
  {
    id: 1,
    q: 'What is CryptoTrack?',
    a: 'CryptoTrack is a premium portfolio tracker that gives you real-time prices, analytics, and watchlist management for 10,000+ cryptocurrencies — all in one dark, beautiful dashboard.',
  },
  {
    id: 2,
    q: 'Is my data secure?',
    a: 'Absolutely. We use industry-standard JWT authentication, encrypted storage, and never sell your data to third parties. Your portfolio data is yours alone.',
  },
  {
    id: 3,
    q: 'Which exchanges are supported?',
    a: 'CryptoTrack pulls live data from CoinGecko, which aggregates prices from 500+ exchanges including Binance, Coinbase, Kraken, and OKX.',
  },
  {
    id: 4,
    q: 'How do Trading Bots work?',
    a: 'Our automated trading bots (Pro/Enterprise plan) allow you to set rule-based strategies that execute trades 24/7 while you sleep. You set the rules, the bot does the work.',
  },
  {
    id: 5,
    q: 'Can I track my portfolio across multiple devices?',
    a: 'Yes! With Cloud Sync (Pro plan), your portfolio, watchlist, and settings are automatically synced across all your devices in real time.',
  },
  {
    id: 6,
    q: 'How do I get started?',
    a: 'Click "Get Started" from the home page — no credit card required. Set up your free portfolio in under 60 seconds, then upgrade when you\'re ready.',
  },
  {
    id: 7,
    q: 'Can I import my existing portfolio?',
    a: 'Yes. You can restore an existing portfolio using our "Restore Portfolio" option or manually add your holdings using the coin search feature.',
  },
  {
    id: 8,
    q: 'Is there a mobile app?',
    a: 'A native mobile app is coming soon! In the meantime, CryptoTrack is fully responsive and works great on mobile browsers.',
  },
];

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item ${open ? 'faq-item--open' : ''}`} id={`faq-${item.id}`}>
      <button className="faq-question" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span>{item.q}</span>
        <span className="faq-chevron">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      <div className="faq-answer">
        <p>{item.a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="faq-page">
      <div className="faq-orb faq-orb--1" />
      <div className="faq-orb faq-orb--2" />

      <div className="faq-container">
        <div className="faq-header">
          <div className="faq-badge">FAQ</div>
          <h1 className="faq-title">
            Frequently asked <span className="faq-title--grad">questions</span>
          </h1>
          <p className="faq-subtitle">
            Everything you need to know about CryptoTrack.
          </p>
        </div>

        <div className="faq-list">
          {FAQS.map((item) => (
            <FAQItem key={item.id} item={item} />
          ))}
        </div>

        <div className="faq-contact">
          <p>Still have questions?</p>
          <a href="mailto:support@cryptotrack.app" className="faq-contact__link">
            Contact support →
          </a>
        </div>
      </div>
    </div>
  );
}
