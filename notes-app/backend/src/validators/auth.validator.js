const validator = require("validator");

const validateRegister = ({ name, email, password }) => {
  if (!name || !email || !password) {
    return "All fields are required.";
  }

  if (name.trim().length < 2) {
    return "Name must be at least 2 characters long.";
  }

  if (!validator.isEmail(email)) {
    return "Please provide a valid email address.";
  }

  if (!validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })) {
    return "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.";
  }

  return null;
};

const validateLogin = ({ email, password }) => {
  if (!email || !password) {
    return "Email and password are required.";
  }

  if (!validator.isEmail(email)) {
    return "Invalid email address.";
  }

  return null;
};

module.exports = {
  validateRegister,
  validateLogin,
};