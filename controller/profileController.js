const Profile = require('../model/profile');

// @route   GET /api/profile
// @desc    Retrieve all profiles
// @access  Public
exports.profiles = async (req, res) => {
  const profiles = await Profile.find().populate('user', 'avatar name -_id');
  if (!profiles) return res.status(400).send('No profile saved.');

  res.json(profiles);
};

// @route   GET /api/profile/me
// @desc    current user profile
// @access  Private
exports.profile = async (req, res) => {
  const { id } = req.user;
  const profile = await Profile.findOne({ user: id }).populate(
    'user',
    'avatar name -_id'
  );
  if (!profile) return res.status(400).send('No profile for this user.');

  res.json(profile);
};

// @route   PUT /api/profile/me/experience
// @desc    Update and add user's profile experience
// @access  Private
exports.experience = async (req, res) => {
  const { id } = req.user;
  const profile = await Profile.findOneAndUpdate(
    { user: id },
    { $push: { experience: req.body } },
    { new: true }
  );

  res.json(profile);
};

// @route   PUT /api/profile/me/experience/:id
// @desc    Update and remove user's profile experience
// @access  Private
exports.removeExperience = async (req, res) => {
  const { id } = req.user;
  const profile = await Profile.findOneAndUpdate(
    { user: id },
    { $pull: { experience: { _id: req.params.id } } },
    { new: true }
  );

  res.json(profile);
};

// @route   PUT /api/profile/me/education
// @desc    Update and add user's profile education
// @access  Private
exports.education = async (req, res) => {
  const { id } = req.user;
  const profile = await Profile.findOneAndUpdate(
    { user: id },
    { $push: { education: req.body } },
    { new: true }
  );

  res.json(profile);
};

// @route   PUT /api/profile/me/education/:id
// @desc    Update and remove user's profile education
// @access  Private
exports.removeEducation = async (req, res) => {
  const { id } = req.user;
  const profile = await Profile.findOneAndUpdate(
    { user: id },
    { $pull: { education: { _id: req.params.id } } },
    { new: true }
  );

  res.json(profile);
};

// @route   GET /api/user/:id
// @desc    Get user profile by id
// @access  Public
exports.profileById = async (req, res) => {
  const { id } = req.params;
  const profile = await Profile.findById(id).populate(
    'user',
    'name avatar -_id'
  );
  if (!profile) return res.status(400).send('No profile for this user.');

  res.json(profile);
};

// @route   GET /api/handle/:handle
// @desc    Get user profile by handle
// @access  Public
exports.profileByHandle = async (req, res) => {
  const { handle } = req.params;
  const profile = await Profile.findOne({ handle: handle }).populate(
    'user',
    'name avatar -_id'
  );
  if (!profile) return res.status(400).send('No profile for this user.');

  res.json(profile);
};

// @route   DELETE /api/profile
// @desc    Delete profile
// @access  PRIVATE
exports.remove = async (req, res) => {
  const { id } = req.user;
  const profile = await Profile.findOneAndDelete({ user: id });

  if (!profile) return res.status(400).send('No profile for this user.');
  res.json(profile);
};

// @route   POST /api/profile
// @desc    Create user profile
// @access  Private
exports.create = async (req, res) => {
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
