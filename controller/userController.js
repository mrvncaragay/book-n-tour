const gravatar = require('gravatar');
const User = require('../model/user');

// @route   GET /api/users
// @desc    Get a all users
// @access  Public
exports.getAllUsers = (req, res) => {
  //const avatar = gravatar.url(this.email, { s: '200', r: 'pg', d: 'mp' });
  res.json('Hellow');
};

exports.createUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined!' });
};
