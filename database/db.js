const fs = require("fs/promises");
const path = require("path");

const pathtofile = path.join(__dirname, "../db.json");

async function readFile() {
  try {
    let data = await fs.readFile(pathtofile, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
}

async function writeFile(data) {
  try {
    await fs.writeFile(pathtofile, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(err);
  }
}

async function readwithdelay() {
  try {
    await new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
    let data = await readFile();
    return data;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { readFile, writeFile, readwithdelay };
