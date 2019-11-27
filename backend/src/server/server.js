const cors = require("cors");
const express = require("express");
const route = require("./routes/route");

const app = express();

app.use(cors());
app.use("/", route);

module.exports = app;
