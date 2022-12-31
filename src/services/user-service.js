const jwt = require("jsonwebtoken");
const { UserRepository } = require("../repository/index");
const { JWT_KEY } = require("../config/serverConfig");
const { FAIL, SUCCESS } = require("../utils/responseConstants");
const bcrypt = require("bcrypt");
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

  //sign in user
  async signIn(data) {
    try {
      //need to check if the email if or password enterd by used is ther in db
      const userFromDB = await this.userRepository.getUserByEmail(data.email);

      if (userFromDB === null) {
        throw "User do not exist";
      }
      //get the plainPassword and email;
      const verficationReponse = await this.#verifyUser(userFromDB, data).then(
        (response) => {
          return response;
        }
      );

      // console.log("user Verified", verficationReponse.message);
      if (verficationReponse.status === SUCCESS) {
        console.log("verified");
        const jwt = this.#generateToken({
          email: userFromDB.email,
          id: userFromDB.id,
        });
        console.log(jwt);
        return jwt;
      } else {
        throw verficationReponse.message;
      }
    } catch (error) {
      console.log("Some error in servicelayer in signIn()");
      throw error;
    }
  }

  async #verifyUser(userFromDB, data) {
    let response = {};
    // console.log(userFromDB, data);
    try {
      if (userFromDB.email !== data.email) {
        console.log("Email entered is not correct");
        response.message = "Email incorrect";
        response.status = "fail";
        return response;
      }
      if (!bcrypt.compareSync(data.password, userFromDB.password)) {
        console.log("Password entered is not correct");
        response.message = "Password incorrect";
        response.status = "fail";
        return response;
      }
      return { message: "user verified", status: "success" };
    } catch (error) {
      console.log("Some error in servicelayer in verifyUser()");
      throw error;
    }
  }

  //user is signed in generate token for user
  async #generateToken(data) {
    try {
      const token = jwt.sign(data, JWT_KEY, { expiresIn: "2d" });
      return token;
    } catch (error) {
      console.log("Some error in servicelayer in generateToken()");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      console.log(response);
      return response;
    } catch (error) {
      console.log("Something went wrong in token validation", error);
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid token" };
      }
      const user = await this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "No user with the corresponding token exists" };
      }
      return user.id;
    } catch (error) {
      console.log("Something went wrong in the auth process");
      throw error;
    }
  }
}

module.exports = UserService;
