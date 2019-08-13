const Post = require('../model/post');

// @route   GET /api/posts/:id
// @desc    Get a single post
// @access  Public
exports.post = async (req, res) => {
  res.json(req.post);
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
  let post = new Post({
    user: req.user.id,
    ...req.body
  });

  post = await post.save();
  res.json(post);
};

// @route   DELETE /api/posts/:id
// @desc    Delete post
// @access  Private
exports.remove = async (req, res) => {
  req.post.remove();
  res.json(req.post);
};

// @route   PUT /api/posts/like/:id
// @desc    Like a post
// @access  Private
exports.like = async (req, res) => {
  let { post } = req;

  post.likes.addToSet(req.user.id);
  post = await post.save();
  res.json({ likes: post.user });
};

// Decided whethere you want to do this....

// @route   PUT /api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
exports.unlike = async (req, res) => {
  let { post } = req;

  post.likes.pull(req.user.id);
  post = await post.save();
  res.json({ likes: post.user });
};

// @route   PUT /api/posts/comment/:id
// @desc    Create a comment
// @access  Private
exports.comment = async (req, res) => {
  let { post } = req;
  const { id: userId, avatar, name } = req.user;

  post.comments.push({
    user: userId,
    name,
    avatar,
    text: req.body.text
  });

  post = await post.save();
  res.json({ comments: post.comments });
};

// @route   PUT /api/posts/uncomment/:id/:commentId
// @desc    Remove a comment
// @access  Private
exports.uncomment = async (req, res) => {
  let { post } = req;

  post.comments.pull({ _id: req.params.commentId });
  post = await post.save();
  res.json({ comments: post.comments });
};
