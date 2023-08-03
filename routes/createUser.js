const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "Ohz1C2mVXfNGTsRSmpxmv29fZS9YABN5z";

router.post(
  "/createuser",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(7);
    const securePassword = await bcrypt.hash(req.body.password, salt);

    try {
      const userData = await User.findOne({
        email: req.body.email,
      });
      if (userData) {
        return res
          .status(409)
          .json({ success: false, errors: "User already exists" });
      }
      await User.create({
        name: req.body.name,
        password: securePassword,
        email: req.body.email,
        location: req.body.location,
      });
      const data = {
        user: {
          id: req.body.email,
        },
      };
      const authtoken = jwt.sign(data, jwtSecret);
      res.json({ success: true, authtoken });
    } catch (e) {
      console.log(e);
      res.json({ success: false, errorMessage: e });
    }
  }
);

router.post(
  "/loginuser",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const userData = await User.findOne({
        email: req.body.email,
      });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials" });
      }
      if (!bcrypt.compare(req.body.password, userData.password)) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials" });
      }
      const data = {
        user: {
          id: userData.id,
        },
      };
      const authtoken = jwt.sign(data, jwtSecret);
      res.json({ success: true, authtoken });
    } catch (e) {
      console.log(e);
      res.json({ success: false, errorMessage: e });
    }
  }
);

module.exports = router;
