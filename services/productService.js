const { readwithdelay } = require("../database/db");

async function getAllProducts() {
  return await readwithdelay();
}

async function getProductById(id) {
  const data = await readwithdelay();
  const product = data.find((p) => p.id === id);
  return product || null;
}

module.exports = { getAllProducts, getProductById };
