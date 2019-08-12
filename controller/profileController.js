const Profile = require('../model/profile');

// @route GET /api/profile
// @desc  current user profile
// @access Private
exports.profile = async (req, res, next) => {
  const { id } = req.user;

  const profile = await Profile.findOne({ user: id });
  if (!profile) return res.status(400).send('No profile for this user.');

  res.json(profile);
};
