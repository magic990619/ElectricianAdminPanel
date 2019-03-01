var express = require('express');
var router = express.Router();

var _main = require('./ctl_main.js');
var _tokenCheck = require('../../config/auth_token.js');

router.use(function timeLog (req, res, next) {
  console.log('Category Time: ', Date.now());
  // _tokenCheck.tokenCheck(req,res,next);
  next();
});

router.post('/getAllCategories', _main.getAllCategories);

router.post('/getCategoriesByCode', _main.getCategoriesByCode);

router.post('./getCategoryNameByCode', _main.getCategoryNameByCode);

router.post('/addNewCategory', _main.addNewCategory);

router.post('/updateCategory', _main.updateCategory);

router.post('/removeCategory', _main.removeCategory);

router.post('/changeFreeStatus', _main.changeFreeStatus);

module.exports = router;