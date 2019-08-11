const express = require('express');

const { isJwtValid } = require('../middleware/auth');
const {
  getAllUsers,
  create,
  current
} = require('../controller/userController');
const { isBodyValid, isEmailTaken } = require('../middleware/user');

const router = express.Router();

router.get('/me', isJwtValid, current);
router.get('/', getAllUsers);
router.post('/', isBodyValid, isEmailTaken, create);

module.exports = router;
