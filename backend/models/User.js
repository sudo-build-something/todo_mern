const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: { 
    type: String, 
    required: true, 
    unique: true },
  email: { 
    type: String, 
    required: true, 
    unique: true },
  password: String,
  createdAt: { 
    type: Date, 
    default: Date.now }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
