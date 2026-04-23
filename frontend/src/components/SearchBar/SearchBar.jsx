import { useSearch } from '../../hooks/useCoins';
import { Link } from 'react-router-dom';
import './SearchBar.css';

export default function SearchBar() {
  const { query, setQuery, results, searching } = useSearch();
  const showDropdown = query.length > 0;

  return (
    <div className="searchbar-wrapper">
      <div className="searchbar-input-wrap">
        <span className="searchbar-icon">🔍</span>
        <input
          id="coin-search"
          type="text"
          className="searchbar-input"
          placeholder="Search Bitcoin, Ethereum…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
        {searching && <span className="searchbar-spinner" />}
        {query && (
          <button className="searchbar-clear" onClick={() => setQuery('')}>✕</button>
        )}
      </div>

      {showDropdown && (
        <div className="searchbar-dropdown animate-fade-in">
          {results.length === 0 && !searching && (
            <div className="searchbar-empty">No results found</div>
          )}
          {results.slice(0, 8).map((coin) => (
            <Link
              key={coin.id}
              to={`/coin/${coin.id}`}
              className="searchbar-result"
              onClick={() => setQuery('')}
            >
              {coin.thumb && (
                <img src={coin.thumb} alt={coin.name} className="result-thumb" />
              )}
              <div>
                <div className="result-name">{coin.name}</div>
                <div className="result-symbol">{coin.symbol?.toUpperCase()}</div>
              </div>
              {coin.market_cap_rank && (
                <span className="result-rank">#{coin.market_cap_rank}</span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
