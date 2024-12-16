const express = require("express");
const userControl = require("./../controllers/usersControllers");
const router = express.Router();

router.route("/").get(userControl.getAllUsers).post(userControl.createUser);
router.route("/:id").get(userControl.getUser).put(userControl.updateUser);
module.exports = router;
