const cache = {};
const TTL = 60 * 1000; 

function getCache(key) {
  const entry = cache[key];
  if (!entry) return null;

  const age = Date.now() - entry.createdAt;
  if (age > TTL) {
    delete cache[key];
    return null;
  }

  return entry.value;
}

function setCache(key, value) {
  cache[key] = {
    value,
    createdAt: Date.now(),
  };
}

function invalidateCache() {
  for (const key in cache) {
    delete cache[key];
  }
}

module.exports = { getCache, setCache, invalidateCache };
