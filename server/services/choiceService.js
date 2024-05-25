const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.postChoice = async (data) => {
  const { employeeId, menuId, choices } = data;

  if (!employeeId || !menuId || !choices) {
    throw new Error("Employee ID, Menu ID, and choices are required");
  }

  const menu = await prisma.menu.findUnique({
    where: { id: menuId },
  });

  if (!menu) {
    throw new Error("Menu not found");
  }

  const invalidOptions = choices.filter(
    (option) => !menu.options.includes(option)
  );
  if (invalidOptions.length > 0) {
    throw new Error(
      `Selected options are not available in the menu: ${invalidOptions.join(
        ", "
      )}`
    );
  }

  const existingChoice = await prisma.choice.findUnique({
    where: {
      employeeId_menuId: {
        employeeId,
        menuId,
      },
    },
  });

  if (existingChoice) {
    throw new Error("You have already made a choice for this menu");
  }

  try {
    const newChoice = await prisma.Choice.create({
      data: {
        employeeId,
        menuId,
        choices,
      },
    });
    return newChoice;
  } catch (error) {
    throw new Error("Error creating choice: " + error.message);
  }
};
