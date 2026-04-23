import api from './api';

export const getMarkets = ({ currency = 'usd', page = 1, perPage = 20 } = {}) =>
  api.get('/crypto/markets', { params: { currency, page, per_page: perPage } });

export const searchCoins = (q) =>
  api.get('/crypto/search', { params: { q } });

export const getCoinDetail = (id) =>
  api.get(`/crypto/coins/${id}`);

export const getCoinChart = (id, { currency = 'usd', days = 7 } = {}) =>
  api.get(`/crypto/coins/${id}/chart`, { params: { currency, days } });

export const getTrending = () =>
  api.get('/crypto/trending');
