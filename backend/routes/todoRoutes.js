const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.get("/", todoController.getHome);
router.get("/:listName", todoController.getCustomList);
router.post("/", todoController.addItem);
router.post("/delete", todoController.deleteItem);
router.get("/about", (req, res) => res.render("about"));

module.exports = router;
