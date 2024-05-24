const employeeService = require("../services/employeeService");

exports.registerEmployee = async (req, res) => {
  try {
    const newEmployee = await employeeService.registerEmployee(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginEmployee = async (req, res) => {
  try {
    const result = await employeeService.loginEmployee(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.verifyEmployee = async (req, res) => {
  try {
    const result = await employeeService.verifyEmployee(req.employee.email);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
