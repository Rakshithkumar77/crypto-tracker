const NodeCache = require('node-cache');

class CacheService {
  constructor() {
    this.cache = new NodeCache({ checkperiod: 120 });
  }

  get(key) {
    return this.cache.get(key) ?? null;
  }

  set(key, value, ttlSeconds) {
    const ttl = ttlSeconds || parseInt(process.env.CACHE_TTL_PRICES) || 60;
    this.cache.set(key, value, ttl);
  }

  del(key) {
    this.cache.del(key);
  }

  flush() {
    this.cache.flushAll();
  }

  has(key) {
    return this.cache.has(key);
  }
}

module.exports = new CacheService();
