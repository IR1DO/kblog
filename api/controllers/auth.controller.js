const User = require('../models/user.model');
const bcrybtjs = require('bcryptjs');
const { errorHandler } = require('../utils/error');

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    next(errorHandler(400, 'All fields are required'));
  }

  const hashedPassword = bcrybtjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json({ message: 'Signup successful' });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup };
