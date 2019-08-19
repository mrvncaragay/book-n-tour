const bcrypt = require('bcrypt');
const User = require('../model/user');

// @route   GET /api/users
// @pre     Execute in order:
// @desc    Get a all users
// @access  Public
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password -__v');
  res.json(users);
};

// @route   POST /api/users
// @pre     Execute in order: isBodyValid, isEmailTaken
// @desc    create a new user in the DB
// @access  Public
exports.create = async (req, res) => {
  const { name, password, email } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({
    name,
    password: hashedPassword,
    email
  });

  await user.save();

  res.header('x-auth-token', user.jwtToken).json({
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar
  });
};
