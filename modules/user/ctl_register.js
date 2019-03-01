var UserSchema = require('../schemas/user_schema.js');
var bcrypt = require('bcryptjs');

module.exports.register = function (req, res) {
 
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    console.log("user register =>");
    var profileImage ;
    if (req.body.profile == "" || req.body.profile == undefined || req.body.profile == null)
        profileImage = "assets/img/faces/face-0.jpg"; 
    else 
        profileImage = req.body.profile;

    var userInfo = {
        email :     req.body.email || null,
        password:   hash,
        first_name: req.body.first_name,
        last_name:  req.body.last_name,
        birth_date: req.body.birth_date,
        phone:    req.body.phone || null,
        description: null,
        usertype:   req.body.usertype == undefined ? 0 : req.body.usertype,
        profileImg : profileImage,
    }
    console.log(userInfo);
    
    UserSchema.findOne({ 'email': req.params.email }, function (err, user) {
        if (err || user == null) {
            UserSchema.create(userInfo, function(err, doc){
                if(err){
                    res.status(401).json(err);
                } else{
                    res.status(201).json(doc);
                }
            })
        } else {
            console.log(user);
            res.json({ success: false, message: 'Email is already exist' });
        }
    });
}
  
module.exports.checkUsername = function (req, res) {
   
    UserSchema.findOne({ 'email': req.params.email}, function(err, user){
        if(err){
            res.status(401).json(err);
        }else{
            res.status(201).json(user);
        }
    })
}
