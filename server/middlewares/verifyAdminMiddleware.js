const adminService = require("../services/adminService");

exports.verifyAdminMiddleware = async (req, res, next) => {
  try {
    const adminData = await adminService.verifyAdmin(req.admin.username);
    if (adminData.verifyAdmin === "yes") {
      req.admin = adminData;
      next();
    } else {
      res.status(401).json({
        status: "Failed",
        message: "Unauthorized access",
      });
    }
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      message: error.message,
    });
  }
};
