const express = require("express");
const userRoutes = require("./routers/userRoutes");
const app = express();

app.use(express.json());

app.use("/users", userRoutes);

module.exports = app;
