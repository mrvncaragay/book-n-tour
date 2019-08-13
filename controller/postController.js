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
  res.json(post);
};

// @route   PUT /api/posts/like/:id
// @desc    Like a post
// @access  Private
exports.like = async (req, res) => {
  const likes = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { likes: req.user.id }
    },
    { new: true }
  ).select('likes -_id');

  res.json(likes);
};

// @route   PUT /api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
exports.unlike = async (req, res) => {
  const likes = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { likes: req.user.id }
    },
    { new: true }
  ).select('likes -_id');

  res.json(likes);
};

// @route   PUT /api/posts/comment/:id
// @desc    Create a comment
// @access  Private
exports.comment = async (req, res) => {
  const { id: userId, avatar, name } = req.user;
  const comments = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        comments: {
          user: userId,
          name,
          avatar,
          text: req.body.text
        }
      }
    },
    { new: true }
  ).select('comments -_id');

  res.json(comments);
};

// @route   PUT /api/posts/uncomment/:id/:commentId
// @desc    Remove a comment
// @access  Private
exports.uncomment = async (req, res) => {
  const comments = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { comments: { _id: req.params.commentId } }
    },
    { new: true }
  ).select('comments -_id');

  res.json(comments);
};
