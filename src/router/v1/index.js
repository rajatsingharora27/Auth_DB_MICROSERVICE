const express = require("express");
const router = express.Router();
const UserController = require("../../controller/user-controller");

router.post("/create", UserController.createUser);
router.delete("/deleteUser", UserController.deleteUser);
router.post("/signin", UserController.signIn);

module.exports = router;
