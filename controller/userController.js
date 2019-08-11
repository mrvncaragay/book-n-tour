const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const User = require('../model/user');

// @route   GET /api/users
// @desc    Get a all users
// @access  Public
exports.getAllUsers = (req, res) => {
  //const avatar = gravatar.url(this.email, { s: '200', r: 'pg', d: 'mp' });
  res.json('Hellow');
};

exports.createUser = async (req, res) => {
  const { name, password, email } = req.body;

  const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mp' });
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    name,
    password: hashedPassword,
    email,
    avatar
  });

  await user.save();

  res.json({
    name: user.name,
    email: user.email,
    avatar: user.avatar
  });
};
