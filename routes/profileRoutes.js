const express = require('express');
const router = express.Router();
const {
  analyzeProfile,
  getAllProfiles,
  getProfileByUsername,
  getProfileById,
  deleteProfile
} = require('../controllers/profileController');

router.post('/analyze/:username', analyzeProfile);
router.get('/', getAllProfiles);
router.get('/username/:username', getProfileByUsername);
router.get('/:id', getProfileById);
router.delete('/:username', deleteProfile);

module.exports = router;
