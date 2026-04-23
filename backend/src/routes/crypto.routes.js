const { Router } = require('express');
const {
  getMarkets,
  searchCoins,
  getCoinChart,
  getCoinDetail,
  getTrending,
} = require('../controllers/crypto.controller');

const router = Router();

// All crypto routes are public (no auth required)
router.get('/markets', getMarkets);
router.get('/search', searchCoins);
router.get('/trending', getTrending);
router.get('/coins/:id', getCoinDetail);
router.get('/coins/:id/chart', getCoinChart);

module.exports = router;
