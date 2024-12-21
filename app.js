const express = require("express");
const app = express();
const userRoutes = require("./routers/userRoutes");
app.use(express.json());
const ErrApp = require("./apiModules/errApp");
const globalErrCont = require("./controllers/errorController");

app.use("/users", userRoutes);
app.all("*", (req, res, next) => {
  res
    .status(404)
    .json({ status: "Failed", message: `Cant find ${req.originalUrl}` });
  // next(new ErrApp(`Cant find ${req.originalUrl}`, 404));
});
app.use(globalErrCont);

module.exports = app;
