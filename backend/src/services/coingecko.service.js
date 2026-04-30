const axios = require('axios');
const cacheService = require('./cache.service');

const BASE_URL = process.env.COINGECKO_API_BASE || 'https://api.coingecko.com/api/v3';

const buildHeaders = () => {
  const headers = { 'Accept': 'application/json' };
  if (process.env.COINGECKO_API_KEY) {
    headers['x-cg-demo-api-key'] = process.env.COINGECKO_API_KEY;
  }
  return headers;
};

const geckoGet = async (path, params = {}, cacheKey = null) => {
  try {
    const res = await axios.get(`${BASE_URL}${path}`, {
      headers: buildHeaders(),
      params,
      timeout: 10000,
    });
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 429 && cacheKey) {
      console.log(`[Rate Limit] 429 hit for ${path}. Using fallback cache for: ${cacheKey}`);
      const fallbackData = cacheService.getFallback(cacheKey);
      if (fallbackData) {
        return fallbackData;
      }
    }
    throw error;
  }
};

/**
 * Get a paginated list of coins with market data.
 */
const getMarkets = async ({ currency = 'usd', page = 1, perPage = 20, ids = '' } = {}) => {
  const cacheKey = `markets:${currency}:${page}:${perPage}:${ids}`;
  const cached = cacheService.get(cacheKey);
  if (cached) return cached;

  const params = {
    vs_currency: currency,
    order: 'market_cap_desc',
    per_page: perPage,
    page,
    sparkline: false,
    price_change_percentage: '24h',
  };
  if (ids) params.ids = ids;

  const data = await geckoGet('/coins/markets', params, cacheKey);
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

  const data = await geckoGet('/search', { query }, cacheKey);
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

  const data = await geckoGet(`/coins/${coinId}/market_chart`, {
    vs_currency: currency,
    days,
  }, cacheKey);
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

  const data = await geckoGet(`/coins/${coinId}`, {
    localization: false,
    tickers: false,
    community_data: false,
    developer_data: false,
    sparkline: false,
  }, cacheKey);
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

  const data = await geckoGet('/search/trending', {}, cacheKey);
  cacheService.set(cacheKey, data, 300);
  return data;
};

module.exports = { getMarkets, searchCoins, getCoinChart, getCoinDetail, getTrending };
