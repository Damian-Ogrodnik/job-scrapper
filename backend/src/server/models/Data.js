const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const searchSchema = new Schema({
  name: String,
  data: {
    type: Object,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});
const Search = mongoose.model("Search", searchSchema);

module.exports = Search;
