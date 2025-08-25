const Item = require("../models/Item");
const List = require("../models/List");
const date = require("../utils/date");
const auth = require("../config/auth");

const defaultItems = [
  new Item({ name: "Do the dishes" }),
  new Item({ name: "Do the laundry" }),
  new Item({ name: "Feed the dogs" }),
];

exports.getHome = async (req, res) => {
  if (req.isAuthenticated()) {
    const day = date.getDate();
    const items = await Item.find();
    if (items.length === 0) {
      await Item.insertMany(defaultItems);
      return res.redirect("/");
    }

    res.render("list", { listTitle: day, newListItems: items });
  } else {
    res.redirect("/login");
  }
};

exports.getCustomList = async (req, res) => {
  const customListName = req.params.listName;
  let list = await List.findOne({ name: customListName });
  if (!list) {
    list = new List({ name: customListName, items: defaultItems });
    await list.save();
  }
  res.render("list", { listTitle: list.name, newListItems: list.items });
};

exports.addItem = async (req, res) => {
  const itemName = req.body.newitem;
  const listName = req.body.list;
  const item = new Item({ name: itemName });

  if (listName === date.getDate()) {
    await item.save();
    res.redirect("/");
  } else {
    const list = await List.findOne({ name: listName });
    list.items.push(item);
    await list.save();
    res.redirect("/" + listName);
  }
};

exports.deleteItem = async (req, res) => {
  const { checkbox: itemId, listName } = req.body;

  if (listName === date.getDate()) {
    await Item.findByIdAndRemove(itemId);
    res.redirect("/");
  } else {
    await List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: itemId } } }
    );
    res.redirect("/" + listName);
  }
};

