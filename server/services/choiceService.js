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

exports.updateChoice = async (data) => {
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

  if (!existingChoice) {
    throw new Error("No existing choice found to update");
  }

  try {
    const updatedChoice = await prisma.choice.update({
      where: {
        id: existingChoice.id,
      },
      data: {
        choices,
      },
    });
    return updatedChoice;
  } catch (error) {
    throw new Error("Error updating choice: " + error.message);
  }
};

exports.getChoice = async (employeeId, menuId) => {
  if (!employeeId || !menuId) {
    throw new Error("Employee ID and Menu ID are required");
  }

  try {
    const choice = await prisma.choice.findUnique({
      where: {
        employeeId_menuId: {
          employeeId,
          menuId,
        },
      },
    });

    if (!choice) {
      throw new Error("No choice found for the specified menu and employee");
    }

    return choice;
  } catch (error) {
    throw new Error("Error retrieving choice: " + error.message);
  }
};

exports.getAllChoices = async (body) => {
  const { menuId } = body;
  if (!menuId) {
    throw new Error("Menu ID is required");
  }

  try {
    const choices = await prisma.choice.findMany({
      where: { menuId },
      include: {
        employee: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!choices || choices.length === 0) {
      throw new Error("No choices found for the specified menu");
    }

    return choices;
  } catch (error) {
    throw new Error("Error retrieving choices: " + error.message);
  }
};
