const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

// IMPORT OUR UTILITIES FUNCTION
const { getAllUsers } = require("../utilities/userStorage");

// Express - Validator Validations
const signInValidations = [
  body("email").isEmail().withMessage("Invalid email"),
];

// Middleware to check if the email exists
const checkEmailExistance = (req, res, next) => {
  const submittedEmail = req.body.email;

  const existingUsers = getAllUsers();

  const userExist = existingUsers.find((user) => user.email === submittedEmail);

  if (!userExist) {
    const error = new Error("Email not found. Please try again or sign up.");
    error.status = 400;
    next(error);
  } else {
    req.user = userExist;
    next();
  }
};

// Handle Express Validations
const validationResponder = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.status = 400;
    error.details = errors.array();
    next(error);
  }
  next();
};

router.post(
  "/",
  signInValidations,
  validationResponder,
  checkEmailExistance,
  async (req, res, next) => {
    const { email, password, firstName, lastName } = req.body; //req.body is object sent by clients

    try {
      const doesMatch = await bcrypt.compare(password, req.user.password);
      console.log(`password: ${password}`);
      console.log(`req.user.password: ${req.user.password}`)

      if (!doesMatch) {
        const error = new Error("Password does not match.");
        error.status = 401;
        return next(error);
      }

      res.status(200).json({
        success: true,
        message: "Login successfully.",
        user: {
          firstName: req.user.firstName,
          lastName: req.user.lastName,
        }
      });
    } catch(error) {
        error.status = 500;
        next(error);
    }
  }
);

module.exports = router;
