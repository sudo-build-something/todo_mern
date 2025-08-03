const mongoose = require("mongoose");
const itemSchema = require("../schemas/itemSchema");

module.exports = mongoose.model("Item", itemSchema);
