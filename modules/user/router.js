var express = require('express');
var router = express.Router();
var _update = require('./ctl_edit.js');
var _remove = require('./ctl_delete.js');
var _getUser = require('./ctl_getUser.js');
var _tokenCheck = require('../../config/auth_token.js');
var _admin = require('./ctl_adminuser.js');
var _allusers = require('./ctl_getalluser.js');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('User Time: ', Date.now());
  _tokenCheck.tokenCheck(req,res,next);
});

// Get User By Id
router.get('/getUserDataById/:userid', _getUser.getUserDataById);

// Get User By Email
router.get('/getUserDataByEmail/:email', _getUser.getUserDataByEmail);

// Get User Profile Image By Email
router.get('/getUserPhotoByEmail/:email', _getUser.getUserPhotoByEmail)

// Edit
router.put('/edit', _update.edit);

// New Feedback
router.put('/new_feedback', _update.addFeedback);

// Delete
router.get('/delete/:email', _remove.delete);

// Edit Profil Img
router.put('/edit/profilImage', _update.editProfileImg);

// Get Token
router.get('/getToken/:token', _getUser.getToken);

//router.get('/status', _getUser.getUserStatus);

// Get Admin Info
router.get('/getAdminData', _admin.adminUser);

// Get All Users
router.get('/getAllUsers', _allusers.getAllUsers);

// Edit Feedback
router.put('/edit_feedback', _update.editFeedback);

// Delete Feedback
router.post('/delete_feedback', _update.deleteFeedback);
module.exports = router;