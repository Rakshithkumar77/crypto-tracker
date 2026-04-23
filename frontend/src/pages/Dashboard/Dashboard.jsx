import React from 'react';
import { useCoins } from '../../hooks/useCoins';
import { useWatchlist } from '../../hooks/useWatchlist';
import CoinCard from '../../components/CoinCard/CoinCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import Pagination from '../../components/Pagination/Pagination';
import { SkeletonCard } from '../../components/Loader/Loader';
import './Dashboard.css';

const CURRENCIES = ['usd', 'eur', 'gbp', 'inr', 'btc'];

export default function Dashboard() {
  const [currency, setCurrency] = React.useState('usd');
  const { coins, loading, error, page, totalPages, goToPage } = useCoins({ currency });
  const { toggle, isWatched } = useWatchlist();

  return (
    <div className="dashboard">
      <div className="container">
        {/* Hero */}
        <div className="dashboard-hero">
          <div>
            <h1 className="page-title">
              Crypto Markets{' '}
              <span className="gradient-text">Live</span>
            </h1>
            <p className="page-subtitle">
              Real-time prices for {totalPages * 20}+ cryptocurrencies
            </p>
          </div>
          <SearchBar />
        </div>

        {/* Filters */}
        <div className="dashboard-controls">
          <div className="currency-tabs">
            {CURRENCIES.map((c) => (
              <button
                key={c}
                className={`currency-tab ${currency === c ? 'active' : ''}`}
                onClick={() => { setCurrency(c); goToPage(1); }}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>
          <span className="results-info">
            Page {page} of {totalPages}
          </span>
        </div>

        {/* Error */}
        {error && (
          <div className="alert-error">
            ⚠ {error} — Try refreshing the page.
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="coins-grid">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="coins-grid">
            {coins.map((coin) => (
              <CoinCard
                key={coin.id}
                coin={coin}
                isWatched={isWatched(coin.id)}
                onWatchToggle={toggle}
              />
            ))}
          </div>
        )}

        {!loading && coins.length === 0 && !error && (
          <div className="empty-state">
            <div className="empty-state-icon">🪙</div>
            <h3>No coins found</h3>
            <p>Try a different page or currency.</p>
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
      </div>
    </div>
  );
}
