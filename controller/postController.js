const Post = require('../model/post');

// @route   GET /api/posts/:id
// @pre     Execute in order: isObjectIdValid
// @desc    Get a single post
// @access  Public
exports.post = async (req, res) => {
  const post = await Post.findById(req.params.id).lean();
  if (!post)
    return res
      .status(404)
      .json({ error: `The post with the given id was not found.` });

  res.json(post);
};

// @route   GET /api/posts
// @pre     Execute in order:
// @desc    Get all posts
// @access  Public
exports.posts = async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .limit(15);

  res.json(posts);
};

// @route   POST /api/posts
// @pre     Execute in order: isJwtValid, isBodyValid
// @desc    Create post
// @access  Private
exports.create = async (req, res) => {
  const { title, subtitle, text } = req.body;

  const post = new Post({
    user: req.user.id,
    title,
    subtitle,
    text,
    posturl: req.file ? req.file.location : '',
    name: req.user.name,
    avatar: req.user.avatar
  });

  await post.save();

  res.json(post);
};

// @route   PUT /api/posts/like/:id
// @pre     Execute in order: isObjectIdValid, isPostExist and isJwtValid
// @desc    Like a post
// @access  Private
exports.like = async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, {
    $addToSet: {
      likes: req.user.id
    }
  });

  if (!post)
    return res
      .status(404)
      .json({ error: `The post with the given id was not found.` });

  res.json(req.user.id);
};

// @route   PUT /api/posts/unlike/:id
// @pre     Execute in order: isObjectIdValid, isPostExist and isJwtValid
// @desc    Unlike a post
// @access  Private
exports.unlike = async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, {
    $pull: {
      likes: req.user.id
    }
  });

  if (!post)
    return res
      .status(404)
      .json({ error: `The post with the given id was not found.` });

  res.json(req.user.id);
};

// @route   PUT /api/posts/comment/:id
// @pre     Execute in order: isObjectIdValid and isJwtValid
// @desc    Create a comment
// @access  Private
exports.comment = async (req, res) => {
  const { id, name, avatar } = req.user;
  const comment = {
    user: id,
    name,
    avatar,
    text: req.body.text
  };
  const { comments } = await Post.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $push: {
        comments: {
          $each: [comment],
          $sort: { date: -1 }
        }
      }
    },
    { new: true }
  )
    .lean()
    .select('comments -_id');

  if (!comments)
    return res
      .status(404)
      .json({ error: `The post with the given id was not found.` });

  // Return the newest comment. note: slice is not working...
  res.json(comments[0]);
};

// @route   PUT /api/posts/uncomment/:id/:commentId
// @pre     Execute in order: isObjectIdValid and isJwtValid
// @desc    Remove a comment
// @access  Private
exports.uncomment = async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { comments: { _id: req.params.commentId } }
    },
    { new: true }
  ).lean();

  if (!post)
    return res
      .status(404)
      .json({ error: `The post with the given id was not found.` });

  res.json({ commentId: req.params.commentId });
};

// @route   PUT /api/posts/:id
// @pre     Execute in order: isJwtValid and isBodyValid
// @desc    Update user post
// @access  Private
exports.update = async (req, res) => {
  const posturl = req.file ? req.file.location : req.body.posturl;

  const post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      posturl
    },
    { new: true }
  ).select('title subtitle text posturl -_id');

  if (!post)
    return res
      .status(404)
      .json({ error: `The post with the given id was not found.` });

  res.json(post);
};

// @route   DELETE /api/posts/:id
// @pre     Execute in order: isObjectIdValid
// @desc    DElete a single post
// @access  Private
exports.remove = async (req, res) => {
  // Check if profile exist
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(403).json({ error: 'Post not found.' });

  // Check if method is DELETE and the current user is the owner
  if (post.user.toString() !== req.user.id)
    return res.status(401).json({ error: 'User not authorized' });

  await post.remove();
  res.json(post._id);
};

// @route   GET /api/posts/paginate
// @pre     Execute in order:
// @desc    Pagination request
// @access  Private
exports.pagination = async (req, res) => {
  const { pageNumber, pageSize } = req.query;
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(Number.parseInt(pageNumber - 1, 10) * Number.parseInt(pageSize, 10))
      .limit(Number.parseInt(pageSize, 10));

    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};
