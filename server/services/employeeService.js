const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerEmployee = async (data) => {
  const { username, email, password } = data;
  if (!username || !email || !password) {
    throw new Error("Username, email and password are required");
  }

  const existingEmployee = await prisma.Employee.findUnique({
    where: { email },
  });

  if (existingEmployee) {
    throw new Error("email already exists");
  }

  try {
    const saltRounds = 14;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newEmployee = await prisma.Employee.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return newEmployee;
  } catch (error) {
    throw new Error("Error registering Employee: " + error.message);
  }
};

exports.loginEmployee = async (data) => {
  const { email, password } = data;
  if (!email || !password) {
    throw new Error("email and password are required");
  }
  const employee = await prisma.Employee.findUnique({
    where: { email },
  });

  if (!employee) {
    throw new Error("Invalid Username or password");
  }

  const isPasswordValid = await bcrypt.compare(password, employee.password);
  if (!isPasswordValid) {
    throw new Error("Invalid Username or password");
  }

  const token = jwt.sign(
    { id: employee.id, username: employee.username, email: employee.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token };
};

exports.verifyEmployee = async (email) => {
  try {
    const employee = await prisma.Employee.findUnique({
      where: { email },
    });

    const newEmployeeData = {
      username: employee?.username,
      email: employee?.email,
    };

    return newEmployeeData;
  } catch (error) {
    throw new Error(error.message);
  }
};
