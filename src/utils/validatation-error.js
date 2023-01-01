const AppErrors = require("./errorHandler");
const { StatusCodes } = require("http-status-codes");

class ValidataionError extends AppErrors {
  constructor(error) {
    let errorName = error.name;
    let explanation = [];
    error.errors.forEach((err) => {
      explanation.push(err.message);
    });
    super(
      errorName,
      "Details Entered by user may be incorrect",
      explanation,
      StatusCodes.BAD_REQUEST
    );
  }
}

module.exports = ValidataionError;
