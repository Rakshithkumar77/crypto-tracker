const { Router } = require('express');
const { signup, login, getMe } = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authenticate, getMe);

module.exports = router;
