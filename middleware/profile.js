const Joi = require('@hapi/joi');
const Profile = require('../model/profile');

const validate = profile => {
  const schema = {
    user: Joi.string(),
    handle: Joi.string()
      .max(40)
      .required(),
    company: Joi.string(),
    website: Joi.string().uri(),
    locaton: Joi.string(),
    status: Joi.string()
      .valid(
        'Software Developer',
        'Backend Developer',
        'Frontend Developer',
        'Student',
        'Instructor'
      )
      .required(),
    skills: Joi.string().required(),
    bio: Joi.string(),
    githubusername: Joi.string(),
    youtube: Joi.string().uri(),
    facebook: Joi.string().uri(),
    twitter: Joi.string().uri(),
    linkedin: Joi.string().uri(),
    instagram: Joi.string().uri()
  };

  return Joi.validate(profile, schema, { abortEarly: false });
};

exports.hasProfile = async (req, res, next) => {
  const { id } = req.user;

  const profile = await Profile.findOne({ user: id });
  if (profile)
    return res.status(400).send('Profile for this user already exists.');

  next();
};

exports.isBodyValid = (req, res, next) => {
  const { error } = validate(req.body);
  // const eMsgs = error.details.map(({ message, context }) => ({
  //   [context.key]: message
  // }));

  //const eMsgs = error.details.map(({ message }) => message);
  return error ? res.status(400).send(error.details[0].message) : next();
};
