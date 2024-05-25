const express = require("express");
const router = express.Router();

const { postChoice } = require("../controller/choiceController");
const { verifyEmployeeToken } = require("../middlewares/verifyEmployeeToken");

router.route("/").post(verifyEmployeeToken, postChoice);

module.exports = router;
