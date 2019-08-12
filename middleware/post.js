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
    // likes: Joi.array().items(
    //   Joi.object({
    //     user: Joi.string()
    //   })
    // ),
    // comments: Joi.array().items(
    //   Joi.object({
    //     user: Joi.string(),
    //     text: Joi.string().required(),
    //     name: Joi.string(),
    //     avatar: Joi.string(),
    //     date: Joi.date()
    //   })
    // )
  };

  return Joi.validate(post, schema, { abortEarly: false });
};

exports.isBodyValid = (req, res, next) => {
  const { error } = validate(req.body);
  return error ? res.status(400).send(error.details[0].message) : next();
};

exports.isPostOwner = async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (post.user.toString() !== req.user.id)
    return res.status(401).json({ error: 'User not authorized' });

  next();
};
