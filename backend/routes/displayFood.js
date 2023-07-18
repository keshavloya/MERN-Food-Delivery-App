const express = require("express");
const router = express.Router();

router.post("/foodData", async (req, res) => {
  try {
    res.send(global.food_data);
  } catch (e) {
    console.error(e);
    res.send("server error");
  }
});

module.exports = router;
