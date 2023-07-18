const express = require("express");
const router = express.Router();
const Order = require("../models/orders");

router.post("/orderData", async (req, res) => {
  const order_data = req.body.order_data;
  const emailId = await Order.findOne({ email: req.body.email });
  if (emailId === null) {
    try {
      const data = {
        email: req.body.email,
        order_data: [
          {
            date: req.body.order_date,
            order: order_data,
          },
        ],
      };
      console.log(data);
      await Order.create(data);
      console.log("order creation success");
      res.json({ sucess: true });
    } catch (e) {
      console.log(e);
      res.send("server error", e.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        {
          $push: {
            order_data: {
              date: req.body.order_date,
              order: order_data,
            },
          },
        }
      );
      res.json({ success: true });
    } catch (e) {
      console.error(e);
      res.send("server error", e.message);
    }
  }
});

router.post("/getOrderData", async (req, res) => {
  try {
    const myOrderData = await Order.findOne({ email: req.body.email });
    res.json(myOrderData);
  } catch (error) {
    console.log(error);
    res.send("server error", error.message);
  }
});

module.exports = router;
