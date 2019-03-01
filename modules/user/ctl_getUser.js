var UserSchema = require('../schemas/user_schema.js');
var jwt = require('jsonwebtoken');
var jwtDecode = require('jwt-decode');

module.exports.getUserDataById = function (req, res) {

    UserSchema.findOne({ '_id': req.params.userid }, function (err, user) {

        if (err) {
            res.status(401).json(err);
        } else {
            res.status(201).json(user);
        }
    })
}

module.exports.getUserDataByEmail = function (req, res) {

    UserSchema.findOne({ 'email': req.params.email }, function (err, user) {

        if (err) {
            res.status(401).json(err);
        } else {
            res.status(201).json(user);
        }
    })
}

module.exports.getUserPhotoByEmail = function (req, res) {

    UserSchema.findOne({ 'email': req.params.email }, function (err, user) {

        if (err) {
            res.status(401).json(err);
        } else {
            res.status(201).json({"photo_url" : user.profileImg});
        }
    })
}

module.exports.getToken = function (req, res) {
    var token = req.params.token;
    if (token) {
        var decodedToken = jwtDecode(token);
        res.status(201).json(decodedToken);
    } else {
        res.json({ success: false, message: 'No Token provided' });
    }

}
