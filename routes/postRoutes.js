const express = require('express');
const {
  post,
  posts,
  create,
  remove,
  like,
  unlike,
  comment,
  uncomment
} = require('../controller/postController');
const { isJwtValid, isObjectIdValid } = require('../middleware/auth');
const { isBodyValid, isPostExist, isPostOwner } = require('../middleware/post');

const router = express();

// Called this twice instead of writing it multiple times for each route, mutiple param callback is not supported
// Check all route that has parameter /:id or mongoose id is valid
router.param('id', isObjectIdValid);
router.param('id', isPostExist);

// POST DELETE AND PUT must have a valid JWT token
router
  .route('/*')
  .post(isJwtValid)
  .delete(isJwtValid)
  .put(isJwtValid);

router
  .route('/')
  .get(posts)
  .post(isBodyValid, create);
router
  .route('/:id')
  .get(post)
  .delete(isPostOwner, remove);
router.put('/like/:id', like);
router.put('/unlike/:id', unlike);
router.put('/comment/:id', comment);
router.put('/uncomment/:id/:commentId', uncomment);

module.exports = router;
