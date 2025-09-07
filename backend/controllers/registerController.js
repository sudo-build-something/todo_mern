const auth = require("../config/auth");
const User = require("../models/User");
const userValidator = require('../services/userValidation');

exports.getRegister = async (req, res) => {
  const errors = {}
  res.render("register", { errors });
};

exports.submitRegister = async (req, res) => {
  const { valid, errors } = userValidator.validateRegistrationInput(req.body);
  const {firstname, lastname, username, email, password } = req.body;
  if (valid) {
    const user = new User({
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email
    });
    
    User.register(user, password, (err) => {
      if (err) {
        console.log(err);
        return res.redirect("register", { errors });
      }
      return res.redirect("login");
    });
  
  } else {
    res.render("register", { errors });
  }
};