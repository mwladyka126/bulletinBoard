const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

function escape(html) {
  return html
    .replace(/&/g, "")
    .replace(/</g, "")
    .replace(/>/g, "")
    .replace(/"/g, "")
    .replace(/'/g, "");
}

module.exports = router;
