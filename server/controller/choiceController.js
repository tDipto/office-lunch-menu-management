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

exports.updateChoice = async (req, res) => {
  const { menuId, choices } = req.body;
  const employeeId = req.employee.id;

  try {
    const updatedChoice = await choiceService.updateChoice({
      employeeId,
      menuId,
      choices,
    });
    res.status(200).json(updatedChoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getChoice = async (req, res) => {
  const { menuId } = req.body;
  const employeeId = req.employee.id;

  try {
    const choice = await choiceService.getChoice(employeeId, menuId);
    res.status(200).json(choice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
