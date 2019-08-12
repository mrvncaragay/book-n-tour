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
  remove,
  create
} = require('../controller/profileController');
const { isJwtValid, isObjectIdValid } = require('../middleware/auth');
const {
  hasProfile,
  isBodyValid,
  isValidExperience,
  isValidEducation
} = require('../middleware/profile');

const router = express.Router();

router.param('id', isObjectIdValid);
router
  .route('/')
  .get(profiles)
  .post(isJwtValid, hasProfile, isBodyValid, create)
  .delete(isJwtValid, remove);

router.get('/me', isJwtValid, profile);
router.get('/user/:id', profileById);
router.get('/handle/:handle', profileByHandle);
router.put('/me/experience', isJwtValid, isValidExperience, experience);
router.put('/me/experience/:id', isJwtValid, removeExperience);
router.put('/me/education', isJwtValid, isValidEducation, education);
router.put('/me/education/:id', isJwtValid, removeEducation);

module.exports = router;
