const auth = require("../config/auth");
const User = require("../models/User");

exports.getRegister = async (req, res) => {
  res.render("register");
};

exports.submitRegister = async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  //TODO: validation
  
  const user = new User({
    firstname: firstname,
    lastname: lastname,
    username: username,
    email: email
  });

  User.register(user, password, (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect("/register");
    } else {
      return res.redirect("/login");
    }
  });
}