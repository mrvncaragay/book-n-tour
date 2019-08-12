const Post = require('../model/post');

// @route   GET /api/posts
// @desc    Get a single post
// @access  Public
exports.post = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post)
    return res.status(404).json('The post with the given ID was not found.');
  res.json(post);
};

// @route   GET /api/posts
// @desc    Get all posts
// @access  Public
exports.posts = async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  if (posts.length === 0) return res.status(404).json('No posts found.');
  res.json(posts);
};

// @route   POST /api/posts
// @desc    Create post
// @access  Private
exports.create = async (req, res) => {
  const { id } = req.user;

  let post = new Post({
    user: id,
    ...req.body
  });

  post = await post.save();
  res.json(post);
};

// @route   DELETE /api/posts/:id
// @desc    Delete post
// @access  Private
exports.remove = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post)
    return res.status(404).json('The post with the given ID was not found.');

  res.json(post);
};
