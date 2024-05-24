const express = require("express");
const router = express.Router();

const {
  registerAdmin,
  loginAdmin,
  verifyAdmin,
} = require("../controller/adminController");
const { verifyAdminToken } = require("../middlewares/verifyAdminToken");

router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);
router.route("/verify").get(verifyAdminToken, verifyAdmin);

module.exports = router;
