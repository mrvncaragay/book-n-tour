const express = require('express');
const { login } = require('../controller/authController');
const { isBodyValid } = require('../middleware/auth');

const router = express.Router();

router.post('/login', isBodyValid, login);

module.exports = router;
