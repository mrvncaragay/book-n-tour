const express = require('express');

const { getAllUsers, create } = require('../controller/userController');
const { isBodyValid, isEmailTaken } = require('../middleware/user');

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', isBodyValid, isEmailTaken, create);

module.exports = router;
