const validator = require("../utils/validation");

exports.validateRegistrationInput = (body) => {
  const {firstname, lastname, username, email, password } = body;
  const errors = {};
  if (!validator.validateName(firstname)) {
    errors.firstname = "Must be alphabetic, longer than 2 characters and may be hyphenated.";
  }

  if (!validator.validateName(lastname)) {
    errors.lastname = "Must be alphabetic, longer than 2 characters and may be hyphenated.";
  }

  if (!validator.validateUsername(username)) {
    errors.username = "Must be alphanumeric, between 6 and 32 characters long and can contain: '-', '.' or '_'.";
  }
  
  if (!validator.validateEmail(email)) {
    errors.email = "Must be a valid email address.";
  }
  
  if (!validator.validatePassword(password)) {
    errors.password = "Must be alphanumeric, contain upper and lowercase letters, contain special characters and be 8 characters or longer.";
  }

  if (Object.keys(errors).length > 0) {
    return {valid: false, errors };
  }

  return {valid: true, errors: errors };
};