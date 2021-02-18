const express = require("express");
const fs = require("fs");
const chars = JSON.parse(
  fs.readFileSync(`${__dirname}/../../data/charMap.json`)
)

const router = express.Router();


console.log(chars)
