import { Link } from 'react-router-dom';
import { useWatchlist } from '../../hooks/useWatchlist';
import { useCoins } from '../../hooks/useCoins';
import Loader from '../../components/Loader/Loader';
import './Watchlist.css';

const fmt = (n) =>
  n == null
    ? 'N/A'
    : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 6 }).format(n);

export default function Watchlist() {
  const { watchlist, loading, toggle } = useWatchlist();

  // Enrich watchlist with live market data
  const { coins: marketCoins } = useCoins({
    currency: 'usd',
    perPage: 250,
    page: 1,
  });

  const enriched = watchlist.map((item) => {
    const live = marketCoins.find((c) => c.id === item.coinId);
    return { ...item, live };
  });

  if (loading) return <Loader fullscreen />;

  return (
    <div className="watchlist-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Your Watchlist ⭐</h1>
          <p className="page-subtitle">Track your favourite cryptocurrencies</p>
        </div>

        {enriched.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🌙</div>
            <h3>Your watchlist is empty</h3>
            <p>Star coins on the markets page to track them here.</p>
            <Link to="/" className="btn btn-primary mt-4">Browse Markets</Link>
          </div>
        ) : (
          <div className="watchlist-table-wrap card">
            <table className="watchlist-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Coin</th>
                  <th>Price</th>
                  <th>24h Change</th>
                  <th>Market Cap</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enriched.map((item, i) => {
                  const change = item.live?.price_change_percentage_24h;
                  const isPos  = change != null && change >= 0;
                  return (
                    <tr key={item.id} className="watchlist-row">
                      <td className="rank-cell">{i + 1}</td>
                      <td>
                        <Link to={`/coin/${item.coinId}`} className="wl-identity">
                          {item.coinImage && (
                            <img src={item.coinImage} alt={item.coinName} className="wl-thumb" />
                          )}
                          <div>
                            <div className="wl-name">{item.coinName}</div>
                            <div className="wl-symbol">{item.coinSymbol?.toUpperCase()}</div>
                          </div>
                        </Link>
                      </td>
                      <td className="price-cell">
                        {fmt(item.live?.current_price)}
                      </td>
                      <td>
                        {change != null ? (
                          <span className={`change-badge ${isPos ? 'positive' : 'negative'}`}>
                            {isPos ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
                          </span>
                        ) : '—'}
                      </td>
                      <td className="cap-cell">
                        {item.live?.market_cap
                          ? `$${(item.live.market_cap / 1e9).toFixed(2)}B`
                          : '—'}
                      </td>
                      <td>
                        <div className="wl-actions">
                          <Link to={`/coin/${item.coinId}`} className="btn btn-ghost btn-sm">
                            Chart
                          </Link>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => toggle({ id: item.coinId, name: item.coinName, symbol: item.coinSymbol, image: item.coinImage })}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
