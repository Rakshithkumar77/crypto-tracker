const prisma = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response.util');

const getWatchlist = async (req, res, next) => {
  try {
    const items = await prisma.watchlistItem.findMany({
      where: { userId: req.user.id },
      orderBy: { addedAt: 'desc' },
    });
    return sendSuccess(res, { watchlist: items }, 'Watchlist fetched.');
  } catch (err) {
    next(err);
  }
};

const addToWatchlist = async (req, res, next) => {
  try {
    const { coinId, coinName, coinSymbol, coinImage } = req.body;
    if (!coinId || !coinName || !coinSymbol) {
      return sendError(res, 'coinId, coinName, and coinSymbol are required.', 400);
    }

    const existing = await prisma.watchlistItem.findUnique({
      where: { userId_coinId: { userId: req.user.id, coinId } },
    });
    if (existing) {
      return sendError(res, 'Coin is already in your watchlist.', 409);
    }

    const item = await prisma.watchlistItem.create({
      data: { userId: req.user.id, coinId, coinName, coinSymbol, coinImage },
    });
    return sendSuccess(res, { item }, 'Coin added to watchlist.', 201);
  } catch (err) {
    next(err);
  }
};

const removeFromWatchlist = async (req, res, next) => {
  try {
    const { coinId } = req.params;
    await prisma.watchlistItem.delete({
      where: { userId_coinId: { userId: req.user.id, coinId } },
    });
    return sendSuccess(res, {}, 'Coin removed from watchlist.');
  } catch (err) {
    next(err);
  }
};

const isInWatchlist = async (req, res, next) => {
  try {
    const { coinId } = req.params;
    const item = await prisma.watchlistItem.findUnique({
      where: { userId_coinId: { userId: req.user.id, coinId } },
    });
    return sendSuccess(res, { inWatchlist: !!item }, 'Status checked.');
  } catch (err) {
    next(err);
  }
};

module.exports = { getWatchlist, addToWatchlist, removeFromWatchlist, isInWatchlist };
