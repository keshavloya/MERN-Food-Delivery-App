const mongoose = require("mongoose");
const { Schema } = mongoose;
require("dotenv").config();

const mongoURI = process.env.MONGO_URI;

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("Connected to mongo Succesfully");
    const food_items_db = mongoose.model(
      "food_item",
      new Schema({}),
      "food_items"
    );
    const food_category_db = mongoose.model(
      "food_category",
      new Schema({}),
      "food_category"
    );
    const food_items = await food_items_db.find({});
    const food_category = await food_category_db.find({});
    global.food_data = [food_items, food_category];
  } catch (e) {
    console.log("Error Connecting to MongoDB", e);
  }
};

module.exports = mongoDB;
