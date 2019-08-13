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

// Check all route that has parameter /:id or mongoose id is valid
router.param('id', isObjectIdValid);

// POST DELETE AND PUT must have a valid JWT token
router
  .route('/*')
  .post(isJwtValid)
  .delete(isJwtValid)
  .put(isJwtValid);

router
  .route('/')
  .get(profiles)
  .post(hasProfile, isBodyValid, create)
  .delete(remove);

router.get('/me', isJwtValid, profile);
router.get('/user/:id', profileById);
router.get('/handle/:handle', profileByHandle);
router.put('/me/experience', isValidExperience, experience);
router.put('/me/experience/:id', removeExperience);
router.put('/me/education', isValidEducation, education);
router.put('/me/education/:id', removeEducation);

module.exports = router;
