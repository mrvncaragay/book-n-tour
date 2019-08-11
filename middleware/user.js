const Joi = require('@hapi/joi');
const User = require('../model/user');

const validate = user => {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(6)
      .max(50)
      .required()
      .email(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
};

exports.isBodyValid = (req, res, next) => {
  const { error } = validate(req.body);

  return error ? res.status(400).send(error.details[0].message) : next();
};

exports.isEmailTaken = async (req, res, next) => {
  const { email } = req.body;

  // Check if user email exists
  const user = await User.findOne({ email });
  if (user) return res.status(400).send('User already registered.');

  next();
};
