const menuService = require("../services/menuService");

exports.postMenu = async (req, res) => {
  try {
    const newMenu = await menuService.postMenu(req.body);
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMenuByDate = async (req, res) => {
  try {
    const menu = await menuService.getMenuByDate(req.body);
    if (!menu) {
      res.status(404).json({ error: "Menu not found" });
      return;
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editMenu = async (req, res) => {
  try {
    const updatedMenu = await menuService.editMenu(req.body);
    res.status(200).json(updatedMenu);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
