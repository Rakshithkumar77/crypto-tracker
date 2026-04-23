/**
 * Shared type definitions (JSDoc for JS projects).
 * Import wherever needed.
 *
 * @typedef {Object} Coin
 * @property {string} id
 * @property {string} symbol
 * @property {string} name
 * @property {string} image
 * @property {number} current_price
 * @property {number} market_cap
 * @property {number} market_cap_rank
 * @property {number} total_volume
 * @property {number} price_change_percentage_24h
 *
 * @typedef {Object} WatchlistItem
 * @property {string} id
 * @property {string} coinId
 * @property {string} coinName
 * @property {string} coinSymbol
 * @property {string|null} coinImage
 * @property {string} userId
 * @property {string} addedAt
 *
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} username
 * @property {string} createdAt
 *
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {string}  message
 * @property {*}       data
 */

// Currency options
export const SUPPORTED_CURRENCIES = ['usd', 'eur', 'gbp', 'inr', 'btc'];

// Chart day options
export const CHART_DAYS = [1, 7, 30, 90, 365];

// API base URL
export const API_BASE = import.meta.env?.VITE_API_BASE_URL ?? 'http://localhost:5000/api';
