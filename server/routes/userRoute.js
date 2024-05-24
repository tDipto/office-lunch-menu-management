const express = require("express");
const router = express.Router();

const {
  registerEmployee,
  loginEmployee,
  verifyEmployee,
} = require("../controller/employeeController");
const { verifyEmployeeToken } = require("../middlewares/verifyEmployeeToken");

router.route("/register").post(registerEmployee);
router.route("/login").post(loginEmployee);
router.route("/verify").get(verifyEmployeeToken, verifyEmployee);

module.exports = router;
