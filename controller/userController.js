const bcrypt = require('bcrypt');
const User = require('../model/user');

// @route   GET /api/users
// @desc    Get a all users
// @access  Public
exports.getAllUsers = (req, res) => {
  res.json('Hellow');
};

// @route   POST /api/users
// @desc    create a new user in the DB
// @access  Public
exports.createUser = async (req, res) => {
  const { name, password, email } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({
    name,
    password: hashedPassword,
    email
  });

  await user.save();

  res.header('x-auth-token', user.jwtToken).json({
    name: user.name,
    email: user.email,
    avatar: user.avatar
  });
};

// @route   PUT /api/users
// @desc    update user info
// @access  private
exports.updateUser = (req, res) => {};
