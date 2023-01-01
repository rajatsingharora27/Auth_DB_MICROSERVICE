const { where } = require("sequelize");
const { User, role } = require("../models/index");
const AttributeError = require("../utils/attribute-error");
const ValidataionError = require("../utils/validatation-error");
const { StatusCodes } = require("http-status-codes");
// const role = require("../models/role");

class UserRepository {
  //Creating the user
  async createUser(data) {
    try {
      const user = await User.create(data);
      console.log("User created Successfully");
      return user;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let validationError = new ValidataionError(error);
        throw validationError;
      }
      console.log("Some Error Occursed in Repository Layer");
      throw error;
    }
  }

  async destroy(userId) {
    try {
      const userDestroy = await User.destroy({
        where: {
          id: userId,
        },
      });
      return userDestroy;
    } catch (error) {
      console.log("Some Error Occursed in Repository Layer");
      throw error;
    }
  }

  async getById(id) {
    try {
      const user = await User.findByPk(id, {
        attributes: ["id", "email"],
      });
      // const user = await User.findByPk(10);
      console.log(user);
      return user;
    } catch (error) {
      console.log("Some Error Occursed in Repository Layer");
      throw error;
    }
  }

  async getUserByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      // if (!user) {
      //   throw new AttributeError(
      //     "AttributeError",
      //     "verify the entered Email",
      //     "Record releated to enterd Email is not present in the database",
      //     StatusCodes.NOT_FOUND
      //   );
      // }
      return user;
    } catch (error) {
      console.log("Some Error Occursed in Repository Layer");
      throw error;
    }
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const adminRole = await role.findOne({
        where: {
          role: "ADMIN",
        },
      });
      return user.hasRole(adminRole);
    } catch (error) {
      console.log("Some Error Occursed in Repository Layer");
      throw error;
    }
  }
}

module.exports = UserRepository;
