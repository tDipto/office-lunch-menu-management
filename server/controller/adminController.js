const adminService = require("../services/adminService");

exports.registerAdmin = async (req, res) => {
  try {
    const newAdmin = await adminService.registerAdmin(req.body);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const result = await adminService.loginAdmin(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.verifyAdmin = async (req, res) => {
  try {
    const result = await adminService.verifyAdmin(req.admin.username);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
