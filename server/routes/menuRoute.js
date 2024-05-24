const express = require("express");
const router = express.Router();

const { postMenu, getMenuByDate } = require("../controller/menuController");

router.route("/").post(postMenu).get(getMenuByDate);

module.exports = router;
