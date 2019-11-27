const mongoose = require("mongoose");
const config = require("../config");

mongoose.Promise = global.Promise;
mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .catch(err => {
    console.log(err);
  });

mongoose.connection
  .on("connected", () => {
    console.log("database: connected");
  })
  .on("disconnected", () => {
    console.log("database: disconnected");
  })
  .on("error", err => {
    console.error(err);
  })
  .on("reconnected", () => {
    console.log("database: reconnected");
  });
