require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const auth = require("./config/auth")
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);

app.use(auth.initialize());
app.use(auth.session());

app.use("/", todoRoutes);

module.exports = app;
