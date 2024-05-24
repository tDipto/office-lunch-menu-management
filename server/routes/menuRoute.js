const express = require("express");
const router = express.Router();
const {
  verifyAdminMiddleware,
} = require("../middlewares/verifyAdminMiddleware");
const { verifyAdminToken } = require("../middlewares/verifyAdminToken");

const {
  postMenu,
  getMenuByDate,
  editMenu,
} = require("../controller/menuController");

router
  .route("/")
  .post(verifyAdminToken, verifyAdminMiddleware, postMenu)
  .get(getMenuByDate)
  .put(verifyAdminToken, verifyAdminMiddleware, editMenu);

module.exports = router;
