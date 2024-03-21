const bcryptjs = require('bcryptjs');

const { errorHandler } = require('../utils/error');
const User = require('../models/user.model');

const test = (req, res) => {
  res.json({ message: 'API is working!' });
};

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }

  if (req.body.password) {
    if (req.body.password.length < 4) {
      return next(errorHandler(400, 'Password must be at least 4 characters'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 3 || req.body.username.length > 20) {
      return next(
        errorHandler(400, 'Usernamem must be between 3 and 20 characters')
      );
    }

    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, 'Usernamem cannot contain spaces'));
    }

    if (req.body.username != req.body.username.toLowerCase()) {
      return next(errorHandler(400, 'Usernamem must be lowercase'));
    }

    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, 'Username can only contain letters and numbers')
      );
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(
        403,
        'You are not allowed to delete this user ' +
          req.user.id +
          ' ' +
          req.params.userId
      )
    );
  }

  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: 'User has been deleted' });
  } catch (error) {
    next(error);
  }
};

const signout = (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('User has been signed out');
  } catch (error) {
    next(error);
  }
};

module.exports = { test, updateUser, deleteUser, signout };
