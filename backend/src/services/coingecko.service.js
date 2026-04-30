const axios = require('axios');
const cacheService = require('./cache.service');

const BASE_URL = 'https://api.coincap.io/v2';

const coincapGet = async (path, params = {}) => {
  const res = await axios.get(`${BASE_URL}${path}`, {
    params,
    timeout: 10000,
  });
  return res.data;
};

const getImageUrl = (symbol) => `https://assets.coincap.io/assets/icons/${symbol?.toLowerCase()}@2x.png`;

// Maps coincap asset to coingecko market format
const mapToCoinGeckoMarket = (asset) => ({
  id: asset.id,
  symbol: asset.symbol.toLowerCase(),
  name: asset.name,
  image: getImageUrl(asset.symbol),
  current_price: parseFloat(asset.priceUsd || 0),
  price_change_percentage_24h: parseFloat(asset.changePercent24Hr || 0),
  market_cap: parseFloat(asset.marketCapUsd || 0),
  total_volume: parseFloat(asset.volumeUsd24Hr || 0),
  market_cap_rank: parseInt(asset.rank || 0),
});

/**
 * Get a paginated list of coins with market data.
 */
const getMarkets = async ({ currency = 'usd', page = 1, perPage = 20, ids = '' } = {}) => {
  const cacheKey = `markets:${currency}:${page}:${perPage}:${ids}`;
  const cached = cacheService.get(cacheKey);
  if (cached) return cached;

  const limit = perPage;
  const offset = (page - 1) * perPage;
  
  const params = { limit, offset };
  if (ids) params.ids = ids;

  const response = await coincapGet('/assets', params);
  const data = response.data.map(mapToCoinGeckoMarket);
  
  cacheService.set(cacheKey, data, parseInt(process.env.CACHE_TTL_PRICES) || 60);
  return data;
};

/**
 * Search coins by query string.
 */
const searchCoins = async (query) => {
  const cacheKey = `search:${query.toLowerCase()}`;
  const cached = cacheService.get(cacheKey);
  if (cached) return cached;

  const response = await coincapGet('/assets', { search: query, limit: 10 });
  const data = {
    coins: response.data.map(c => ({
      id: c.id,
      name: c.name,
      symbol: c.symbol,
      large: getImageUrl(c.symbol),
      market_cap_rank: parseInt(c.rank)
    }))
  };

  cacheService.set(cacheKey, data, parseInt(process.env.CACHE_TTL_SEARCH) || 600);
  return data;
};

/**
 * Get OHLC chart data for a coin over N days.
 */
const getCoinChart = async (coinId, currency = 'usd', days = 7) => {
  const cacheKey = `chart:${coinId}:${currency}:${days}`;
  const cached = cacheService.get(cacheKey);
  if (cached) return cached;

  let interval = 'd1';
  if (days <= 1) interval = 'm15';
  else if (days <= 7) interval = 'h2';
  else if (days <= 30) interval = 'h12';

  const end = Date.now();
  const start = end - (days * 24 * 60 * 60 * 1000);

  const response = await coincapGet(`/assets/${coinId}/history`, {
    interval,
    start,
    end
  });

  const data = {
    prices: response.data.map(d => [d.time, parseFloat(d.priceUsd)])
  };

  cacheService.set(cacheKey, data, parseInt(process.env.CACHE_TTL_CHART) || 300);
  return data;
};

/**
 * Get detailed coin info.
 */
const getCoinDetail = async (coinId) => {
  const cacheKey = `detail:${coinId}`;
  const cached = cacheService.get(cacheKey);
  if (cached) return cached;

  const response = await coincapGet(`/assets/${coinId}`);
  const c = response.data;

  const data = {
    id: c.id,
    symbol: c.symbol.toLowerCase(),
    name: c.name,
    image: { large: getImageUrl(c.symbol) },
    market_cap_rank: parseInt(c.rank),
    market_data: {
      current_price: { usd: parseFloat(c.priceUsd || 0) },
      price_change_percentage_24h: parseFloat(c.changePercent24Hr || 0),
      market_cap: { usd: parseFloat(c.marketCapUsd || 0) },
      total_volume: { usd: parseFloat(c.volumeUsd24Hr || 0) },
      circulating_supply: parseFloat(c.supply || 0),
      total_supply: parseFloat(c.maxSupply || 0)
    },
    description: { en: `${c.name} (${c.symbol}) is currently ranked #${c.rank} by market cap.` }
  };

  cacheService.set(cacheKey, data, 120);
  return data;
};

/**
 * Get trending coins.
 */
const getTrending = async () => {
  const cacheKey = 'trending';
  const cached = cacheService.get(cacheKey);
  if (cached) return cached;

  const response = await coincapGet('/assets', { limit: 7 });
  const data = {
    coins: response.data.map(c => ({
      item: {
        id: c.id,
        coin_id: c.rank,
        name: c.name,
        symbol: c.symbol,
        market_cap_rank: parseInt(c.rank),
        thumb: getImageUrl(c.symbol),
        small: getImageUrl(c.symbol),
        large: getImageUrl(c.symbol),
        slug: c.id,
        price_btc: 0,
        score: parseInt(c.rank)
      }
    }))
  };

  cacheService.set(cacheKey, data, 300);
  return data;
};

module.exports = { getMarkets, searchCoins, getCoinChart, getCoinDetail, getTrending };
