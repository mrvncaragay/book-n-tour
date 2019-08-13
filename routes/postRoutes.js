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
const { isBodyValid, isPostOwner } = require('../middleware/post');

const router = express();

router.param('id', isObjectIdValid);
router
  .route('/')
  .get(posts)
  .post(isJwtValid, isBodyValid, create);
router
  .route('/:id')
  .get(post)
  .delete(isJwtValid, isPostOwner, remove);
router.put('/like/:id', isJwtValid, like);
router.put('/unlike/:id', isJwtValid, unlike);
router.put('/comment/:id', isJwtValid, comment);
router.put('/uncomment/:id/:commentId', isJwtValid, uncomment);

module.exports = router;
