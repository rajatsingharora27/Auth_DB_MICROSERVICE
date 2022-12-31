const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

console.log(process.env.SALT);
module.exports = {
  PORT: process.env.PORT,
  SALT: bcrypt.genSaltSync(9),
  JWT_KEY: process.env.JWT_KEY,
};
