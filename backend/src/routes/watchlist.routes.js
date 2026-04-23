const { Router } = require('express');
const {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
} = require('../controllers/watchlist.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = Router();

// All watchlist routes require authentication
router.use(authenticate);

router.get('/', getWatchlist);
router.post('/', addToWatchlist);
router.get('/check/:coinId', isInWatchlist);
router.delete('/:coinId', removeFromWatchlist);

module.exports = router;
