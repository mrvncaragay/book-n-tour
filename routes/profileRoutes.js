const express = require('express');
const { profile, create } = require('../controller/profileController');
const { isJwtValid } = require('../middleware/auth');
const { hasProfile, isBodyValid } = require('../middleware/profile');

const router = express.Router();

router.get('/', isJwtValid, profile);
router.post('/', isJwtValid, hasProfile, isBodyValid, create);

module.exports = router;
