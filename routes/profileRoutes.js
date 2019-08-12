const express = require('express');
const {
  profiles,
  profile,
  experience,
  education,
  removeExperience,
  removeEducation,
  profileById,
  profileByHandle,
  create
} = require('../controller/profileController');
const { isJwtValid } = require('../middleware/auth');
const {
  hasProfile,
  isBodyValid,
  isValidExperience,
  isValidEducation
} = require('../middleware/profile');

const router = express.Router();

router.get('/', profiles);
router.get('/me', isJwtValid, profile);
router.put('/me/experience', isJwtValid, isValidExperience, experience);
router.put('/me/experience/:id', isJwtValid, removeExperience);
router.put('/me/education', isJwtValid, isValidEducation, education);
router.put('/me/education/:id', isJwtValid, removeEducation);

router.get('/user/:id', profileById);
router.get('/handle/:handle', profileByHandle);
router.post('/', isJwtValid, hasProfile, isBodyValid, create);

module.exports = router;
