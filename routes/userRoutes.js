const express = require('express');

const { isJwtValid } = require('../middleware/auth');
const {
  getAllUsers,
  create,
  current
} = require('../controller/userController');
const { isBodyValid, isEmailTaken } = require('../middleware/user');

const router = express.Router();

router.get('/user/me', isJwtValid, current);
router.get('/users', getAllUsers);
router.post('/users', isBodyValid, isEmailTaken, create);

module.exports = router;
