const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerAdmin = async (data) => {
  const { username, password } = data;

  const existingAdmin = await prisma.admin.findUnique({
    where: { username },
  });

  if (existingAdmin) {
    throw new Error("Username already exists");
  }

  try {
    const saltRounds = 14;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newAdmin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
        verifyAdmin: "no",
      },
    });

    return newAdmin;
  } catch (error) {
    throw new Error("Error registering admin: " + error.message);
  }
};

exports.loginAdmin = async (username, password) => {
  const admin = await prisma.admin.findUnique({
    where: { username },
  });

  if (!admin) {
    throw new Error("Invalid Username or password");
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    throw new Error("Invalid Username or password");
  }

  const token = jwt.sign(
    { id: admin.id, username: admin.username, verifyAdmin: admin.verifyAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token };
};
