const mongoose = require("mongoose");
const itemSchema = require("../schemas/itemSchema");

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  items: [itemSchema]
});

module.exports = mongoose.model("List", listSchema);
