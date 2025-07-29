const express = require("express");
const router = express.Router();
const getAllUsers = require("../utilities/userStorage");

router.get("/", (req, res) => {
  try {
    const data = getAllUsers();
    res.status(200).json(data);
  } catch (err) {
    res.status(500), json({ error: "Failed to get user data." });
  }
});

module.exports = router;
