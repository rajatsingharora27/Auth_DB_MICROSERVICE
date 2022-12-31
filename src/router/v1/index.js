const express = require("express");
const router = express.Router();
const UserController = require("../../controller/user-controller");

router.post("/create", UserController.createUser);
router.delete("/deleteUser", UserController.deleteUser);

module.exports = router;
