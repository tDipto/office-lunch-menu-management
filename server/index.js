const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const app = express();
const port = process.env.PORT || 5000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res, next) => {
  res
    .status(200)
    .json({ status: "OK", message: "Server running successfully" });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
