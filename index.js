const express = require("express");
const app = express();
const mongoDB = require("./db");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3001;

mongoDB();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(express.json());
app.use("/api", require("./routes/createUser"));
app.use("/api", require("./routes/displayFood"));
app.use("/api", require("./routes/orderData"));

// production script
app.use(express.static("./client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
