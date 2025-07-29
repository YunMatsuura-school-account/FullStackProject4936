const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/all-users", (req, res) => {
  const usersPath = path.join(__dirname, "../data/users.json");

  try {
    const data = fs.readFileSync(usersPath, "utf-8");
    const users = JSON.parse(data);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to read user data" });
  }
});

module.exports = router;
