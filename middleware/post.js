const Joi = require('@hapi/joi');
const Post = require('../model/post');

const validate = post => {
  const schema = {
    user: Joi.string(),
    text: Joi.string()
      .min(10)
      .max(300)
      .required(),
    name: Joi.string(),
    avatar: Joi.string()
  };

  return Joi.validate(post, schema, { abortEarly: false });
};

exports.isBodyValid = (req, res, next) => {
  const { error } = validate(req.body);
  return error ? res.status(400).send(error.details[0].message) : next();
};

exports.isPostExist = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  // Check if we found a post
  if (!post)
    return res.status(404).json(`The post with the given id was not found.`);

  // Save post reference to req.post
  req.post = post;
  next();
};

exports.isPostOwner = (req, res, next) => {
  // Check if method is DELETE and the current user is the owner
  if (req.post.user.toString() !== req.user.id)
    return res.status(401).json({ error: 'User not authorized' });

  next();
};
