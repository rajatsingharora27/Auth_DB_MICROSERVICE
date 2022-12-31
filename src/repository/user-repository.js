const { where } = require("sequelize");
const { User } = require("../models/index");

class UserRepository {
  //Creating the user
  async createUser(data) {
    try {
      console.log(data);
      const user = await User.create(data);
      console.log("User created Successfully");
      return user;
    } catch (error) {
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
      return user;
    } catch (error) {
      console.log("Some Error Occursed in Repository Layer");
      throw error;
    }
  }
}

module.exports = UserRepository;
