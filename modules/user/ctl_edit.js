var UserSchema = require('../schemas/user_schema.js');

module.exports.edit = function (req, res) {
    console.log(req.body);
    var userInfo = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birth_date: req.body.birth_date,
        phone: req.body.phone,
        description: req.body.description,
    }

    var query = { 'email': req.body.email }

    UserSchema.update(query, userInfo, function (err, doc) {
        if (err) {
            res.status(401).json(err);
        } else {
            res.status(201).json(doc);
        }
    })
}

module.exports.editProfileImg = function (req, res) {
    console.log("User => Edit => EditProfileImg :" + req.body.email);
    var userInfo = {
        profileImg: req.body.profileImg
    }

    var query = { 'email': req.body.email }

    UserSchema.update(query, userInfo, function (err, doc) {
        if (err) {
            res.status(401).json(err);
        } else {
            res.status(201).json(doc);
        }
    })
}

module.exports.addFeedback = function (req, res) {
    console.log("User => Edit => AddFeedback :" + req.body.client_email);

    var feedbackInfo = {
        email: req.body.email,
        rating: req.body.rating,
        comment: req.body.comment
    }

    UserSchema.findOneAndUpdate(
        { "email" : req.body.client_email},
        { $push: { feedbacks: feedbackInfo } },
        { new : true}, 
        function (err, doc) {
            if (err) {
                res.status(401).json(err);
            } else {
                res.status(201).json({success: true, doc: doc});
            }
        }
    );
}

module.exports.editFeedback = function (req, res) {
    console.log("User => Edit => UpdateFeedback");

    UserSchema.findOneAndUpdate(
        { "email" : req.body.user_email, "feedbacks._id": req.body._id},
        {
            "feedbacks.$.rating": req.body.rating,
            "feedbacks.$.client_email": req.body.client_email,
            "feedbacks.$.comment": req.body.comment,
        },
        {new: true},
        function (err, doc) {
            if (err) {
                res.status(401).json(err);
            } else {
                res.status(201).json(doc);
            }
        }
    );
}

module.exports.deleteFeedback = function (req, res) {
    console.log("User => Edit => DeleteFeedback :" + req.body._id);
    console.log(req.body);
    UserSchema.findOne(
        { "email" : req.body.email, "feedbacks._id": req.body._id},
        function (err, doc) {
            if (err) {
                res.status(401).json(err);
            }

            console.log(doc.feedbacks.id(req.body._id));
            doc.feedbacks.id(req.body._id).remove();
            doc.save();
            res.status(201).json(doc);
        }
    );
}