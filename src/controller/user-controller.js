const { UserService } = require("../services/index");

const userService = new UserService();
const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    return res.status(201).json({
      data: user,
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.destroyUser(req.query);
    return res.status(201).json({
      data: user,
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: error,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(req.body);
    console.log(response);
    return res.status(200).json({
      data: response,
      success: true,
      message: "Signed In Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: error,
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    // console.log(token);
    const user = await userService.isAuthenticated(token);
    return res.status(200).json({
      data: user,
      success: true,
      message: "User is Auhtenticated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not Authenticated",
    });
  }
};

module.exports = {
  createUser,
  deleteUser,
  signIn,
  isAuthenticated,
};
