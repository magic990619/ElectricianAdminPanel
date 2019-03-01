var UserSchema = require('../schemas/user_schema.js');

module.exports.getAllUsers = function (req, res) {
    
    UserSchema.find({'usertype': 0}, function (err, doc) {
        if (err) {
            res.status(401).json({ message: 'Error user find' });
        }else{
            res.status(201).json(doc);
        }
    })
}