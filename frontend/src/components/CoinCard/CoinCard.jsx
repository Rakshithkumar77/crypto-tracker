import { Link } from 'react-router-dom';
import './CoinCard.css';

const fmt = (n) =>
  n === undefined || n === null
    ? 'N/A'
    : new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: n >= 1 ? 2 : 6,
      }).format(n);

const fmtCap = (n) => {
  if (!n) return 'N/A';
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9)  return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6)  return `$${(n / 1e6).toFixed(2)}M`;
  return `$${n.toLocaleString()}`;
};

export default function CoinCard({ coin, isWatched, onWatchToggle }) {
  const change = coin.price_change_percentage_24h;
  const isPos  = change >= 0;

  return (
    <div className="coin-card card animate-fade-in-up">
      <div className="coin-card-header">
        <Link to={`/coin/${coin.id}`} className="coin-identity">
          <img src={coin.image} alt={coin.name} className="coin-logo" loading="lazy" />
          <div>
            <div className="coin-name truncate">{coin.name}</div>
            <div className="coin-symbol">{coin.symbol?.toUpperCase()}</div>
          </div>
        </Link>

        <button
          className={`watch-btn ${isWatched ? 'watched' : ''}`}
          onClick={() => onWatchToggle(coin)}
          title={isWatched ? 'Remove from watchlist' : 'Add to watchlist'}
        >
          {isWatched ? '★' : '☆'}
        </button>
      </div>

      <div className="coin-card-body">
        <div className="coin-price">{fmt(coin.current_price)}</div>
        <div className={`coin-change ${isPos ? 'positive' : 'negative'}`}>
          {isPos ? '▲' : '▼'} {Math.abs(change)?.toFixed(2) ?? 'N/A'}%
        </div>
      </div>

      <div className="coin-card-footer">
        <div className="coin-stat">
          <span className="coin-stat-label">Market Cap</span>
          <span className="coin-stat-value">{fmtCap(coin.market_cap)}</span>
        </div>
        <div className="coin-stat">
          <span className="coin-stat-label">Volume 24h</span>
          <span className="coin-stat-value">{fmtCap(coin.total_volume)}</span>
        </div>
        <div className="coin-stat">
          <span className="coin-stat-label">Rank</span>
          <span className="coin-stat-value">#{coin.market_cap_rank}</span>
        </div>
      </div>

      <Link to={`/coin/${coin.id}`} className="coin-card-cta">
        View Chart →
      </Link>
    </div>
  );
}
