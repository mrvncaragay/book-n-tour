const express = require('express');
const { profile } = require('../controller/profileController');
const { isJwtValid } = require('../middleware/auth');

const router = express.Router();

router.get('/', isJwtValid, profile);

module.exports = router;
