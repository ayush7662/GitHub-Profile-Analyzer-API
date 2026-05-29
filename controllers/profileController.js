const Profile = require('../models/Profile');
const githubService = require('../services/githubService');

const analyzeProfile = async (req, res) => {
  try {
    const { username } = req.params;
    
    if (!username || username.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Username is required'
      });
    }
    
    const profileData = await githubService.analyzeProfile(username);
    
    const savedProfile = await Profile.create(profileData);
    
    res.status(200).json({
      success: true,
      message: 'Profile analyzed and saved successfully',
      data: savedProfile
    });
  } catch (error) {
    console.error('Error analyzing profile:', error);
    
    if (error.message === 'GitHub user not found') {
      return res.status(404).json({
        success: false,
        message: 'GitHub user not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to analyze profile',
      error: error.message
    });
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll();
    
    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles
    });
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profiles',
      error: error.message
    });
  }
};

const getProfileByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    
    const profile = await Profile.findByUsername(username);
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found in database'
      });
    }
    
    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
      error: error.message
    });
  }
};

const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const profile = await Profile.findById(id);
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
      error: error.message
    });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const { username } = req.params;
    
    await Profile.delete(username);
    
    res.status(200).json({
      success: true,
      message: 'Profile deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete profile',
      error: error.message
    });
  }
};

module.exports = {
  analyzeProfile,
  getAllProfiles,
  getProfileByUsername,
  getProfileById,
  deleteProfile
};
