import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCoinDetail, getCoinChart } from '../../services/crypto.service';
import { useWatchlist } from '../../hooks/useWatchlist';
import PriceChart from '../../components/PriceChart/PriceChart';
import Loader from '../../components/Loader/Loader';
import './CoinDetail.css';

const DAYS_OPTIONS = [1, 7, 30, 90, 365];

const fmt = (n, decs = 2) =>
  n === undefined || n === null
    ? 'N/A'
    : new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD',
        minimumFractionDigits: decs, maximumFractionDigits: decs + 4,
      }).format(n);

const fmtCap = (n) => {
  if (!n) return 'N/A';
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9)  return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6)  return `$${(n / 1e6).toFixed(2)}M`;
  return `$${n.toLocaleString()}`;
};

export default function CoinDetail() {
  const { id } = useParams();
  const [coin, setCoin]         = useState(null);
  const [chartData, setChartData] = useState(null);
  const [days, setDays]         = useState(7);
  const [loading, setLoading]   = useState(true);
  const [chartLoading, setChartLoading] = useState(false);
  const [error, setError]       = useState(null);
  const { toggle, isWatched }   = useWatchlist();

  useEffect(() => {
    setLoading(true);
    Promise.all([getCoinDetail(id), getCoinChart(id, { days })])
      .then(([coinRes, chartRes]) => {
        setCoin(coinRes.data.data.coin);
        setChartData(chartRes.data.data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!coin) return;
    setChartLoading(true);
    getCoinChart(id, { days })
      .then((res) => setChartData(res.data.data))
      .catch(() => {})
      .finally(() => setChartLoading(false));
  }, [days]);

  if (loading) return <Loader fullscreen />;

  if (error || !coin) {
    return (
      <div className="container" style={{ paddingTop: 40 }}>
        <div className="alert-error">Failed to load coin data. <Link to="/">← Back</Link></div>
      </div>
    );
  }

  const md = coin.market_data || {};
  const price  = md.current_price?.usd;
  const change = md.price_change_percentage_24h;
  const isPos  = change >= 0;
  const coinObj = {
    id: coin.id, name: coin.name, symbol: coin.symbol,
    image: coin.image?.large,
  };

  const stats = [
    { label: 'Market Cap',      value: fmtCap(md.market_cap?.usd) },
    { label: '24h Volume',      value: fmtCap(md.total_volume?.usd) },
    { label: '24h High',        value: fmt(md.high_24h?.usd) },
    { label: '24h Low',         value: fmt(md.low_24h?.usd) },
    { label: 'All-Time High',   value: fmt(md.ath?.usd) },
    { label: 'All-Time Low',    value: fmt(md.atl?.usd) },
    { label: 'Circulating Supply', value: md.circulating_supply ? `${(md.circulating_supply / 1e6).toFixed(2)}M ${coin.symbol?.toUpperCase()}` : 'N/A' },
    { label: 'Market Cap Rank', value: `#${coin.market_cap_rank}` },
  ];

  return (
    <div className="coin-detail-page">
      <div className="container">
        {/* Back */}
        <Link to="/" className="back-link">← Back to Markets</Link>

        {/* Header */}
        <div className="detail-header card">
          <div className="detail-identity">
            <img src={coin.image?.large} alt={coin.name} className="detail-logo" />
            <div>
              <h1 className="detail-name">{coin.name}</h1>
              <span className="detail-symbol badge">{coin.symbol?.toUpperCase()}</span>
            </div>
          </div>

          <div className="detail-price-block">
            <div className="detail-price">{fmt(price)}</div>
            <div className={`coin-change ${isPos ? 'positive' : 'negative'}`} style={{ fontSize: '1rem', padding: '6px 14px' }}>
              {isPos ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
            </div>
          </div>

          <button
            className={`btn ${isWatched(coin.id) ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => toggle(coinObj)}
          >
            {isWatched(coin.id) ? '★ Watching' : '☆ Add to Watchlist'}
          </button>
        </div>

        {/* Chart */}
        <div className="detail-chart-section card">
          <div className="chart-header">
            <h2 className="chart-title">Price Chart</h2>
            <div className="days-tabs">
              {DAYS_OPTIONS.map((d) => (
                <button
                  key={d}
                  className={`days-tab ${days === d ? 'active' : ''}`}
                  onClick={() => setDays(d)}
                >
                  {d === 1 ? '24h' : d === 365 ? '1y' : `${d}d`}
                </button>
              ))}
            </div>
          </div>
          {chartLoading ? <Loader /> : <PriceChart chartData={chartData} days={days} coinName={coin.name} />}
        </div>

        {/* Stats grid */}
        <div className="detail-stats-grid">
          {stats.map(({ label, value }) => (
            <div key={label} className="stat-card card">
              <div className="stat-label">{label}</div>
              <div className="stat-value">{value}</div>
            </div>
          ))}
        </div>

        {/* Description */}
        {coin.description?.en && (
          <div className="detail-description card">
            <h2>About {coin.name}</h2>
            <p
              className="description-text"
              dangerouslySetInnerHTML={{ __html: coin.description.en.split('. ').slice(0, 5).join('. ') + '.' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
