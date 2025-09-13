const auth = require("../config/auth");
const User = require("../models/User");


exports.getLogin = async (req, res) => {
    var errors = {};
    res.render("login", { errors });
};

exports.submitLogin = async (req, res) => {
    var errors = {}
    auth.authenticate("local", (err, user, info, status) => {
        if (err) {
            //TODO: Backend errors, log on the server-side (do not report to user).
            //Use appropriate status code.
            console.log(err);
            errors.message = "Something went wrong, please try again later.";
            return res.render("login", { errors });
        }
        if (!user) {
            //TODO: Log the detailed error on the server-side.
            errors.message = "Invalid credentials."
            return res.render("login", { errors });
        }
        req.logIn(user, (err) => {
            if (err) {
                //TODO: Backend errors, log on the server-side (do not report to user).
                // Use appropriate status code.
                console.log(err)
                errors.message = "Something went wrong, please try again later.";
                return res.render("login", { errors });
            }
            res.redirect("/");
        });
    })(req, res);
};

