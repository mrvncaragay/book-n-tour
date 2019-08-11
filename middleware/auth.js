const Joi = require('@hapi/joi');

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

  return Joi.validate(user, schema);
};

exports.isBodyValid = (req, res, next) => {
  const { error } = validate(req.body);

  return error ? res.status(400).send(error.details[0].message) : next();
};
