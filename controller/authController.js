const bcrypt = require('bcrypt');
const User = require('../model/user');

// @route   POST /api/auth/login
// @pre     Execute in order: isBodyValid
// @desc    Authenticate user
// @access  PUBLIC
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  res.send(user.jwtToken);
};
