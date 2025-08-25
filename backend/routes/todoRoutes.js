const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");

router.get("/", todoController.getHome);
router.get("/login", loginController.getLogin);
router.post("/login", loginController.submitLogin)
router.get("/register", registerController.getRegister);
router.post("/register", registerController.submitRegister);
router.post("/", todoController.addItem);
router.post("/delete", todoController.deleteItem);
router.get("/about", (req, res) => res.render("about"));

module.exports = router;
