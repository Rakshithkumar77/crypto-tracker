import { useNavigate } from 'react-router-dom';
import './Pricing.css';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    color: 'blue',
    description: 'Perfect for getting started with crypto tracking.',
    features: [
      'Track up to 10 coins',
      'Real-time prices',
      'Basic portfolio view',
      'CoinGecko data',
    ],
    cta: 'Get Started',
    ctaRoute: '/dashboard',
    featured: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$9',
    period: '/month',
    color: 'purple',
    description: 'For serious crypto investors who need more power.',
    features: [
      'Unlimited coin tracking',
      'Cloud sync across devices',
      'Advanced charts & analytics',
      'Price alerts & notifications',
      'Watchlist sharing',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    ctaRoute: '/dashboard',
    featured: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$49',
    period: '/month',
    color: 'cyan',
    description: 'For teams and professional traders.',
    features: [
      'Everything in Pro',
      'Trading bot integration',
      'API access',
      'Multi-user accounts',
      'Custom exchange integration',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    ctaRoute: '/dashboard',
    featured: false,
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="pricing-page">
      {/* Orbs */}
      <div className="pricing-orb pricing-orb--1" />
      <div className="pricing-orb pricing-orb--2" />

      <div className="pricing-container">
        {/* Header */}
        <div className="pricing-header">
          <div className="pricing-badge">Simple Pricing</div>
          <h1 className="pricing-title">
            Choose your <span className="pricing-title--grad">plan</span>
          </h1>
          <p className="pricing-subtitle">
            Start free. Upgrade when you're ready. No hidden fees.
          </p>
        </div>

        {/* Cards */}
        <div className="pricing-grid">
          {PLANS.map((plan, i) => (
            <div
              key={plan.id}
              id={`plan-${plan.id}`}
              className={`pricing-card pricing-card--${plan.color} ${plan.featured ? 'pricing-card--featured' : ''}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {plan.featured && (
                <div className="pricing-card__popular">Most Popular</div>
              )}

              <div className="pricing-card__header">
                <span className="pricing-card__name">{plan.name}</span>
                <div className="pricing-card__price">
                  <span className="pricing-card__amount">{plan.price}</span>
                  <span className="pricing-card__period">{plan.period}</span>
                </div>
                <p className="pricing-card__desc">{plan.description}</p>
              </div>

              <ul className="pricing-card__features">
                {plan.features.map((f) => (
                  <li key={f} className="pricing-feature">
                    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" className="pricing-feature__check">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`pricing-btn ${plan.featured ? 'pricing-btn--primary' : 'pricing-btn--secondary'}`}
                onClick={() => navigate(plan.ctaRoute)}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="pricing-note">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </div>
  );
}
