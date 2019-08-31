const express = require('express');
const {
  profiles,
  profile,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
  profileById,
  profileByHandle,
  remove,
  create,
  update,
  pagination
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
  .post(isBodyValid, create);

router.get('/paginate', pagination);
router.get('/me', isJwtValid, profile);
router.get('/user/:id', profileById);
router.get('/handle/:handle', profileByHandle);
router.put('/:id', isBodyValid, update);
router.put('/me/experience', isValidExperience, addExperience);
router.put('/me/experience/:id', isValidExperience, updateExperience);
router.put('/me/experience/remove/:id', removeExperience);
router.put('/me/education', isValidEducation, addEducation);
router.put('/me/education/:id', isValidEducation, updateEducation);
router.put('/me/education/remove/:id', removeEducation);
router.delete('/:id', remove);

module.exports = router;
