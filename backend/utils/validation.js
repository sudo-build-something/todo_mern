const { isEmail } = require('validator');

exports.validateName = (name) => {
  const namePattern = /^[A-Za-z]+[\-]?[A-Za-z]+$/;
  return namePattern.test(name);
};

exports.validateUsername = (username) => {
  const usernamePattern = /^[A-Za-z0-9_\-.]{3,32}$/;
  return usernamePattern.test(username);
};

exports.validatePassword = (password) => {
  const uppercase = /[A-Z]/;
  const lowercase = /[a-z]/;
  const digits = /\d/;
  const specialChar = /[!-\/:-@[-`{-~]/;
  const nonPrintable = /[^\x20-\x7E]/; // Outside the printable Unicode range

  return uppercase.test(password) &&
    lowercase.test(password) &&
    digits.test(password) &&
    specialChar.test(password) &&
    !nonPrintable.test(password) &&
    _validateLength(8, 64, password.length);
};

exports.validateEmail = (email) => {
  return isEmail(email);
};

var _validateLength = (min, max, length) => {
  return length >= min && length <= max;
};