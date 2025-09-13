const auth = require("../config/auth");
const User = require("../models/User");
const userValidator = require('../services/userValidation');

exports.getRegister = async (req, res) => {
  const errors = {}
  res.render("register", { errors });
};

exports.submitRegister = async (req, res) => {
  //TODO: Move field validation to the client side and report under fields.
  const { valid, errors } = userValidator.validateRegistrationInput(req.body);
  const {firstname, lastname, username, email, password } = req.body;
  if (valid) {
    const user = new User({
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email
    });
    
    //TODO: Report these errors in modals given backend processing.
    User.register(user, password, (err) => {
      //TODO: Handle UserExists, Validation, Connection & password errors.
      //Implement utility error handler.
      if (err) {
        return res.redirect("register");
      }
      return res.redirect("login");
    });
  
  } else {
    return res.render("register", { errors });
  }
};