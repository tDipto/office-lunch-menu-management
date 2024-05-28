const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.postMenu = async (data) => {
  const { date, options } = data;

  if (!date || !options) {
    throw new Error("Items and Date are required");
  }
  const formattedDate = `${date}T00:00:00Z`;
  const existingMenu = await prisma.menu.findFirst({
    where: { date: formattedDate },
  });

  if (existingMenu) {
    throw new Error("A menu for this date already exists");
  }

  try {
    const newMenu = await prisma.Menu.create({
      data: {
        date: formattedDate,
        options,
      },
    });
    return newMenu;
  } catch (error) {
    throw new Error("Error posting menu: " + error.message);
  }
};

exports.getMenuByDate = async (date) => {
  // const { date } = data;
  console.log(date);
  try {
    const formattedDate = `${date}T00:00:00Z`;
    const menu = await prisma.menu.findFirst({
      where: { date: formattedDate },
    });

    return menu;
  } catch (error) {
    throw new Error("Error fetching menu: " + error.message);
  }
};

exports.editMenu = async (data) => {
  const { date, options } = data;

  if (!date || !options) {
    throw new Error("Items and Date are required");
  }

  const formattedDate = `${date}T00:00:00Z`;

  const existingMenu = await prisma.menu.findFirst({
    where: { date: formattedDate },
  });

  if (!existingMenu) {
    throw new Error("Menu for this date does not exist");
  }

  try {
    const updatedMenu = await prisma.menu.update({
      where: { id: existingMenu.id },
      data: {
        options,
      },
    });
    return updatedMenu;
  } catch (error) {
    throw new Error("Error updating menu: " + error.message);
  }
};
