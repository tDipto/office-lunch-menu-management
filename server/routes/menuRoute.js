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
  .put(verifyAdminToken, verifyAdminMiddleware, editMenu);

router.route("/:id").get(getMenuByDate);

module.exports = router;
