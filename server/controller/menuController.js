const menuService = require("../services/menuService");

exports.postMenu = async (req, res) => {
  try {
    const newMenu = await menuService.postMenu(req.body);
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
