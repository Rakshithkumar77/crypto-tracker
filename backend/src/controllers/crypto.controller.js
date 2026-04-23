const cgService = require('../services/coingecko.service');
const { sendSuccess, sendError } = require('../utils/response.util');

const getMarkets = async (req, res, next) => {
  try {
    const { currency = 'usd', page = 1, per_page = 20 } = req.query;
    const data = await cgService.getMarkets({
      currency,
      page: parseInt(page),
      perPage: Math.min(parseInt(per_page), 100),
    });
    return sendSuccess(res, { coins: data, page: parseInt(page), per_page: parseInt(per_page) }, 'Markets fetched.');
  } catch (err) {
    next(err);
  }
};

const searchCoins = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length < 1) {
      return sendError(res, 'Search query is required.', 400);
    }
    const data = await cgService.searchCoins(q.trim());
    return sendSuccess(res, { results: data.coins || [] }, 'Search results fetched.');
  } catch (err) {
    next(err);
  }
};

const getCoinChart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { currency = 'usd', days = 7 } = req.query;
    const data = await cgService.getCoinChart(id, currency, days);
    return sendSuccess(res, data, 'Chart data fetched.');
  } catch (err) {
    next(err);
  }
};

const getCoinDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await cgService.getCoinDetail(id);
    return sendSuccess(res, { coin: data }, 'Coin detail fetched.');
  } catch (err) {
    next(err);
  }
};

const getTrending = async (req, res, next) => {
  try {
    const data = await cgService.getTrending();
    return sendSuccess(res, { trending: data.coins || [] }, 'Trending coins fetched.');
  } catch (err) {
    next(err);
  }
};

module.exports = { getMarkets, searchCoins, getCoinChart, getCoinDetail, getTrending };
