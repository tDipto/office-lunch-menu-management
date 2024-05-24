const express = require("express");
const router = express.Router();

const {
  postMenu,
  getMenuByDate,
  editMenu,
} = require("../controller/menuController");

router.route("/").post(postMenu).get(getMenuByDate).put(editMenu);

module.exports = router;
