var express = require('express');
var router = express.Router();

var _main = require('./ctl_main.js');
var _tokenCheck = require('../../config/auth_token.js');

router.use(function timeLog (req, res, next) {
    console.log('Content Time: ', Date.now());
    // _tokenCheck.tokenCheck(req,res,next);
    next();
});

router.post('/getContentsByCategoryId', _main.getContentsByCategoryId);

router.post('/addContent', _main.addContent);

router.post('/saveTextContent', _main.saveTextContent);

router.post('/saveVideoContent', _main.saveVideoContent);

router.post('/saveImageContent', _main.saveImageContent);

router.post('/saveQuestionContent', _main.saveQuestionContent);

router.post('/removeContent', _main.removeContent);

router.post('/addProblem', _main.addProblem);

router.post('/removeProblem', _main.removeProblem);

module.exports = router;