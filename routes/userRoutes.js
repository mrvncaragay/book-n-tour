const express = require('express');

const { getAllUsers, createUser } = require('../controller/userController');

const router = express.Router();

router.route('/', getAllUsers);

module.exports = router;
