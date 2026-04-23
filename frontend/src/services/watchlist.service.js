import api from './api';

export const getWatchlist = () =>
  api.get('/watchlist');

export const addToWatchlist = (coin) =>
  api.post('/watchlist', coin);

export const removeFromWatchlist = (coinId) =>
  api.delete(`/watchlist/${coinId}`);

export const checkWatchlist = (coinId) =>
  api.get(`/watchlist/check/${coinId}`);
