const express = require('express');
const {
  profiles,
  profile,
  addExperience,
  updateExperience,
  removeExperience,
  education,
  removeEducation,
  profileById,
  profileByHandle,
  remove,
  create,
  update
} = require('../controller/profileController');

const { isJwtValid, isObjectIdValid } = require('../middleware/auth');
const {
  isBodyValid,
  isValidExperience,
  isValidEducation
} = require('../middleware/profile');

const router = express.Router();

// Check all route that has parameter /:id or mongoose id is valid
router.param('id', isObjectIdValid);

// @desc POST DELETE AND PUT must have a valid JWT token
// @params isJwtValid
router
  .route('/*')
  .post(isJwtValid)
  .delete(isJwtValid)
  .put(isJwtValid);

router
  .route('/')
  .get(profiles)
  .post(isBodyValid, create)
  .delete(remove);

router.get('/me', isJwtValid, profile);
router.get('/user/:id', profileById);
router.get('/handle/:handle', profileByHandle);
router.put('/:id', isBodyValid, update);
router.put('/me/experience', isValidExperience, addExperience);
router.put('/me/experience/:id', isValidExperience, updateExperience);
router.put('/me/experience/remove/:id', removeExperience);
router.put('/me/education', isValidEducation, education);
router.put('/me/education/:id', isValidExperience, removeEducation);

module.exports = router;
