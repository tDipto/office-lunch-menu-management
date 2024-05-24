const express = require("express");
const router = express.Router();

const { registerAdmin, loginAdmin } = require("../controller/adminController");

router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);

module.exports = router;
