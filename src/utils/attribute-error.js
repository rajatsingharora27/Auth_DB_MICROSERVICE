const AppErrors = require("./errorHandler");

class AttributeError extends AppErrors {
  constructor(name, message, explantion, statusCode) {
    super(name, message, explantion, statusCode);
  }
}

module.exports = AttributeError;
