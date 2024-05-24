const express = require("express");
const router = express.Router();

const { postMenu } = require("../controller/menuController");

router.route("/").post(postMenu);

module.exports = router;
