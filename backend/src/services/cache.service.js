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
    // Store a permanent fallback copy in case of API rate limits
    this.cache.set(`fallback:${key}`, value, 0); 
  }

  getFallback(key) {
    return this.cache.get(`fallback:${key}`) ?? null;
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
