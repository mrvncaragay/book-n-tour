const Joi = require('@hapi/joi');
const upload = require('../services/imageUpload');

const validate = post => {
  const schema = {
    text: Joi.string()
      .min(10)
      .max(5000)
      .required(),
    title: Joi.string()
      .min(5)
      .max(100)
      .required(),
    subtitle: Joi.string()
      .min(5)
      .max(100)
      .required(),
    posturl: Joi.allow(''),
    image: Joi.allow('')
  };

  return Joi.validate(post, schema, { abortEarly: false });
};

exports.isBodyValid = (req, res, next) => {
  const { error } = validate(req.body);

  return error
    ? res.status(400).json({ error: error.details[0].message })
    : next();
};

exports.imageUpload = (req, res, next) => {
  const singleUpload = upload.single('image');

  singleUpload(req, res, err => {
    if (err) return res.status(400).json({ error: err.message });

    next();
  });
};
