const { setCache, invalidateCache } = require("../services/cacheService");
const { readFile, writeFile, readwithdelay } = require("../database/db");

async function getProducts(req, res) {
  const products = await readwithdelay();
  setCache(req.url, products);
  res.json(products);
}

async function getProductById(req, res) {
  const data = await readwithdelay();
  const product = data.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  setCache(req.url, product);
  res.json(product);
}

async function createProduct(req, res) {
  const data = await readFile();
  data.push(req.body);
  await writeFile(data);
  invalidateCache();
  res.status(201).json(req.body);
}

async function updateProduct(req, res) {
  const data = await readFile();
  const index = data.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Product not found" });
  data[index] = { ...data[index], ...req.body };
  await writeFile(data);
  invalidateCache();
  res.json(data[index]);
}

async function patchProduct(req, res) {
  const data = await readFile();
  const index = data.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Product not found" });
  data[index] = { ...data[index], ...req.body };
  await writeFile(data);
  invalidateCache();
  res.json(data[index]);
}

async function deleteProduct(req, res) {
  const data = await readFile();
  const index = data.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Product not found" });
  const deleted = data.splice(index, 1);
  await writeFile(data);
  invalidateCache();
  res.json(deleted[0]);
}

module.exports = { getProducts, getProductById, createProduct, updateProduct, patchProduct, deleteProduct };
