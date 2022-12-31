const user = require("../models/user");
const { UserRepository } = require("../repository/index");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data) {
    try {
      const userRequierdInformationToStore = {
        email: data.email,
        password: data.password,
      };
      const user = await this.userRepository.createUser(
        userRequierdInformationToStore
      );
      return user;
    } catch (error) {
      console.log("Error in the Service layer");
      throw error;
    }
  }

  async destroyUser(data) {
    try {
      const user = await this.userRepository.destroy(data.id);
      return user;
    } catch (error) {
      console.log("Some error in servicelayer");
      throw error;
    }
  }
}

module.exports = UserService;
