const jwt = require("jsonwebtoken");

exports.verifyEmployeeToken = async (req, res, next) => {
  try {
    const token = await req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        status: "Failed",
        message: "You are not logged in.",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.employee = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      message: "Invalid token",
      error: error.message,
    });
  }
};
