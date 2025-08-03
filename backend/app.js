const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", todoRoutes); // Mount routes

module.exports = app;
