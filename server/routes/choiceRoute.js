const express = require("express");
const router = express.Router();

const {
  postChoice,
  updateChoice,
  getChoice,
  getAllChoices,
} = require("../controller/choiceController");
const { verifyEmployeeToken } = require("../middlewares/verifyEmployeeToken");
router.route("/allChoice").post(getAllChoices);
router
  .route("/")
  .post(verifyEmployeeToken, postChoice)
  .put(verifyEmployeeToken, updateChoice)
  .get(verifyEmployeeToken, getChoice);

module.exports = router;
