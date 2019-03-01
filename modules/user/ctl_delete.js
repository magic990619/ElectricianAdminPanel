var UserSchema = require('../schemas/user_schema.js');

module.exports.delete = function (req, res) {

    console.log(req.body);
    UserSchema.findOne({'email': req.params.email}, function (err, doc) {
        if (err) {
            res.status(401).json({ message: 'Error user find' });
        }else{
            if (doc == null) {
                console.log(req.params.email + " => doc doesn't exist");
                res.status(401).json({ message: 'null error' , doc: doc});
            }else{
                doc.remove(function (err, doc) {
                    if (err)
                        res.status(401).json({ message: 'Error deleted' });
                    else
                        res.status(201).json({ message: 'Successfully deleted' });
                });
            }
        }
    })
}