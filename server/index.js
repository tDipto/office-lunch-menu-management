const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const app = express();
const port = process.env.PORT || 5000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const adminRoute = require("./routes/adminRoute");
const userRoute = require("./routes/userRoute");
const menuRoute = require("./routes/menuRoute");

app.use("/api/v1/admin/auth", adminRoute);
app.use("/api/v1/employee/auth", userRoute);
app.use("/api/v1/menu", menuRoute);

app.get("/", (req, res, next) => {
  res
    .status(200)
    .json({ status: "OK", message: "Server running successfully" });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
