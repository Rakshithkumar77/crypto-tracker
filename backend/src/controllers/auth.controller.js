const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response.util');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

const signup = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return sendError(res, 'Email, username and password are required.', 400);
    }
    if (password.length < 6) {
      return sendError(res, 'Password must be at least 6 characters.', 400);
    }

    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (existing) {
      return sendError(res, 'Email or username already in use.', 409);
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, username, password: hashed },
    });

    const token = generateToken(user);
    return sendSuccess(
      res,
      { token, user: { id: user.id, email: user.email, username: user.username } },
      'Account created successfully.',
      201
    );
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 'Email and password are required.', 400);
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return sendError(res, 'Invalid credentials.', 401);
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return sendError(res, 'Invalid credentials.', 401);
    }

    const token = generateToken(user);
    return sendSuccess(
      res,
      { token, user: { id: user.id, email: user.email, username: user.username } },
      'Logged in successfully.'
    );
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, username: true, createdAt: true },
    });
    if (!user) return sendError(res, 'User not found.', 404);
    return sendSuccess(res, { user }, 'Profile fetched.');
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login, getMe };
