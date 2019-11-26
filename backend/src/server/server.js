const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const config = require("./config");
const route = require("./routes/route");

const app = express();

app.use(cors());
app.use("/", route);

const PORT = process.env.PORT || config.PORT;

mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

app.listen(PORT, () => {
  console.log("Server is listening...");
});
