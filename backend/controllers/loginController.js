const auth = require("../config/auth");
const User = require("../models/User");


exports.getLogin = async (req, res) => {
    res.render("login");
};

exports.submitLogin = async (req, res) => {
    auth.authenticate("local", (err, user) => {
        if (err) {
            console.log(err);
        }
        if (!user) {
            console.log("Invalid username or password");
            return;
        }
        req.logIn(user, (err) =>{
            if (err) {
                console.log(err)
                return;
            }
            res.redirect("/");
        });
    })(req, res);
};

