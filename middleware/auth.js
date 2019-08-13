const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// @desc    Validate login with predefined valid Joi object
// @return  error object
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

// @desc    validate req.body,
// @return  next middleware or 400
exports.isBodyValid = (req, res, next) => {
  const { error } = validate(req.body);
  return error ? res.status(400).send(error.details[0].message) : next();
};

// @desc    validate JWT token, if successful req.user reference the decoded object
// @result  next middle has access to Current User partial data
// @return  next middleware
exports.isJwtValid = (req, res, next) => {
  const jwtToken = req.header('x-auth-token');

  if (!jwtToken)
    return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// @desc    validate mongoose Id
// @return  next middleware if valid
exports.isObjectIdValid = (req, res, next) => {
  for (const key in req.params) {
    if (!mongoose.Types.ObjectId.isValid(req.params[key]))
      return res
        .status(400)
        .json({ error: `The post with the given ${key} is invalid.` });
  }

  next();
};
