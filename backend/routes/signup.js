const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { getAllUsers, saveUser } = require("../utilities/userStorage");
const { body, validationResult } = require("express-validator");

router.get("/", (req, res) => {});

const signUpValidations = [
  body("firstName").notEmpty().withMessage("First name is required."),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Pass word should be at least 5 characters."),
  body("repassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];

const hashPassword = async (req, res, next) => {
  let currentPassword = req.body.password;

  try {
    const hashPassword = await bcrypt.hash(currentPassword, 10);
    req.body.password = hashPassword;
    next();
  } catch (error) {
    console.log(error.message);
    error.status = 400;
    next(error);
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

const checkEmailExistance = (req, res, next) => {
  const submittedEmail = req.body.email;
  const existingUsers = getAllUsers();
  const isExistingUser = existingUsers.find(
    (user) => user.email === submittedEmail
  );

  if (isExistingUser) {
    const error = new Error("User Exists Already");
    error.status = 400;
    next(error);
  } else {
    next();
  }
};

router.post(
  "/",
  signUpValidations,
  validationResponder,
  checkEmailExistance,
  hashPassword,
  (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    let user = { firstName, lastName, email, password };

    console.log(user);
    saveUser(user);

    res.status(200).json({success: true, message: "User registered successfully" });
  }
);

module.exports = router;
