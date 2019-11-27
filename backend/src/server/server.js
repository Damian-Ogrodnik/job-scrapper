const cors = require("cors");
const express = require("express");
const config = require("./config");
const route = require("./routes/route");
require("./database/database");

const app = express();

app.use(cors());
app.use("/", route);

const PORT = process.env.PORT || config.PORT;

app.listen(PORT, () => {
  console.log("Server is listening...");
});
