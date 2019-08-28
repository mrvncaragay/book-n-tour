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

exports.isPostOwner = (req, res, next) => {
  // Check if method is DELETE and the current user is the owner
  if (req.post.user.toString() !== req.user.id)
    return res.status(401).json({ error: 'User not authorized' });

  next();
};

exports.imageUpload = (req, res, next) => {
  const singleUpload = upload.single('image');

  singleUpload(req, res, err => {
    if (err) return res.status(400).json({ error: err.message });

    next();
  });
};
