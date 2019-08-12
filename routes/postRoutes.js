const express = require('express');
const { post, posts, create, remove } = require('../controller/postController');
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

module.exports = router;
