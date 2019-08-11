const express = require('express');

const { getAllUsers, createUser } = require('../controller/userController');
const { isBodyValid, isEmailTaken } = require('../middleware/user');

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', isBodyValid, isEmailTaken, createUser);

module.exports = router;
