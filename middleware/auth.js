const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const validate = user => {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(50)
      .required()
      .email(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema, { abortEarly: false });
};

exports.isBodyValid = (req, res, next) => {
  const { error } = validate(req.body);

  return error ? res.status(400).send(error.details[0].message) : next();
};

// @desc    validate JWT token, if successful req.user reference the decoded object
// @result  next middle has access to Current User
// @return  next middleware
exports.isJwtValid = (req, res, next) => {
  const jwtToken = req.header('x-auth-token');

  if (!jwtToken)
    return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};

// @desc    validate mongoose Id
// @return  next middleware
exports.isObjectIdValid = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    res.status(404).send('Invalid Id.');

  next();
};
