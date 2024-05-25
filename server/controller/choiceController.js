const choiceService = require("../services/choiceService");

exports.postChoice = async (req, res) => {
  const { menuId, choices } = req.body;

  const employeeId = req.employee.id; // Extracted from token
  try {
    const newChoice = await choiceService.postChoice({
      employeeId,
      menuId,
      choices,
    });
    res.status(201).json(newChoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
