const validationUserSignUpAndSingIn = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(500).json({
      data: {},
      success: "fail",
      message: "Password and email are mandatory please login again",
      error: "Somthing went wrong",
    });
  }
  next();
};

module.exports = {
  validationUserSignUpAndSingIn,
};
