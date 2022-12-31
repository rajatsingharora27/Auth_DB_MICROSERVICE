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

module.exports = {
  createUser,
  deleteUser,
};
