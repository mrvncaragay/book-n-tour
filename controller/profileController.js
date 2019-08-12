const Profile = require('../model/profile');

// @route GET /api/profile
// @desc  current user profile
// @access Private
exports.profile = async (req, res, next) => {
  const { id } = req.user;
  console.log(req.user.jwtToken);
  const profile = await Profile.findOne({ user: id }).populate(
    'user',
    'avatar name -_id'
  );
  if (!profile) return res.status(400).send('No profile for this user.');

  res.json(profile);
};

// @route POST /api/profile
// @desc  Create user profile
// @access Private
exports.create = async (req, res, next) => {
  const { id: userId } = req.user;
  const { youtube, facebook, twiter, linkedin, instagram, ...rest } = req.body;
  const profile = new Profile({
    userId,
    ...rest,
    social: {
      youtube,
      facebook,
      twiter,
      linkedin,
      instagram
    }
  });

  await profile.save();

  res.json(profile);
};
