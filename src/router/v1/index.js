const express = require("express");
const router = express.Router();
const UserController = require("../../controller/user-controller");
const { ValidatainSignUpAndSignIn } = require("../../middlewares/index");

router.post("/signUp", ValidatainSignUpAndSignIn, UserController.createUser);
router.delete("/deleteUser", UserController.deleteUser);
router.post("/signIn", ValidatainSignUpAndSignIn, UserController.signIn);

module.exports = router;
