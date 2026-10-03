const { getCache } = require("../services/cacheService");

function cacheMiddleware(req, res, next) {
  const key = req.url;
  const cached = getCache(key);

  if (cached) {
    res.set("X-Cache", "HIT");
    return res.json(cached);
  }

  res.set("X-Cache", "MISS");
  next();
}

module.exports = { cacheMiddleware };
