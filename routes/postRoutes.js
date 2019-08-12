const express = require('express');
const { post } = require('../controller/postController');
const { isJwtValid } = require('../middleware/auth');

const router = express();

router.post('/', isJwtValid, post);

module.exports = router;
