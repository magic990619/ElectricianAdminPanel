var AccountSchema = require('../schemas/account_schema.js');

var jwt = require('jsonwebtoken');

var bcrypt = require('bcryptjs');

module.exports.getAllAccountData = async function (req, res) {
    try {
        AccountSchema.find( {} , function (err, doc) {
            if (err) {
                console.log(err);
              res.status(201).json({success: false, message: err});
            }else{
                console.log(doc);
                res.status(201).json({success: true, doc: doc});
            }
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({success: false, error: error});
    }
    
}

module.exports.getInactiveAccountData = async function (req, res) {
    try {
        AccountSchema.find( {"account_status": "Inactive"} , function (err, doc) {
            if (err) {
                console.log(err);
              res.status(201).json({success: false, message: err});
            }else{
                console.log(doc);
                res.status(201).json({success: true, doc: doc});
            }
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({success: false, error: error});
    }
    
}

module.exports.getActiveAccountData = async function (req, res) {
    try {
        AccountSchema.find( {"account_status": "Active"} , function (err, doc) {
            if (err) {
                console.log(err);
              res.status(201).json({success: false, message: err});
            }else{
                console.log(doc);
                res.status(201).json({success: true, doc: doc});
            }
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({success: false, error: error});
    }
    
}

module.exports.getClosedAccountData = async function (req, res) {
    try {
        AccountSchema.find( {"account_status": "Closed"} , function (err, doc) {
            if (err) {
                console.log(err);
              res.status(201).json({success: false, message: err});
            }else{
                console.log(doc);
                res.status(201).json({success: true, doc: doc});
            }
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({success: false, error: error});
    }
}

module.exports.getRestrictedAccountData = async function (req, res) {
    try {
        AccountSchema.find( {"account_status": "Restricted"} , function (err, doc) {
            if (err) {
                console.log(err);
              res.status(201).json({success: false, message: err});
            }else{
                console.log(doc);
                res.status(201).json({success: true, doc: doc});
            }
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({success: false, error: error});
    }
    
}

module.exports.updateAccountData = async function (req, res) {
    // console.log(req.body);
    var userInfo = {
        user_name: req.body.user.user_name,
        email: req.body.user.email,
        role: req.body.user.role,
        account_type: req.body.user.account_type,
        account_status: req.body.user.account_status,
        PaymentType: req.body.user.PaymentType,
        PayedDate: req.body.user.PayedDate
    }

    var query = { '_id': req.body.user._id }

    AccountSchema.update(query, userInfo, function (err, doc) {
        if (err) {
            res.status(401).json({success: false, error: err});
        } else {
            res.status(201).json({success: true, doc: doc});
        }
    })
}

module.exports.removeAccountData = function (req, res) {

    console.log(req.body);
    AccountSchema.findOne({'_id': req.body.accountId}, function (err, doc) {
        if (err) {
            res.status(401).json({ message: 'Error user find' });
        }else{
            if (doc == null) {
                console.log(req.body.accountId + " => doc doesn't exist");
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

module.exports.removeAccountsData = function (req, res) {

    console.log(req.body);
    var cursor  = req.body.accountIds;
    cursor.forEach(cur => {
        AccountSchema.findOne({'_id': cur}, function (err, doc) {
            if (err) {
                res.status(401).json({ message: 'Error user find' });
            }else{
                if (doc == null) {
                    console.log(req.body.accountId + " => doc doesn't exist");
                    res.status(401).json({ message: 'null error' , doc: doc});
                }else{
                    doc.remove(function (err, doc) {
                        if (err)
                            res.status(401).json({ message: 'Error deleted' });
                    });
                }
            }
        });    
    });
    res.status(201).json({ message: 'Successfully deleted' });
}

module.exports.getAccountDataById = async function (req, res) {
    console.log(req.body._id);
    try {
        AccountSchema.findOne( { '_id' : req.body._id } , function (err, doc) {
            if (err) {
                console.log(err);
              res.status(201).json({success: false, message: err});
            }else{
                console.log(doc);
                res.status(201).json({success: true, doc: doc});
            }
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({success: false, error: error});
    }
    
}

module.exports.addAccountData = async function (req, res) {
    console.log(req.body.newAccount);
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync("electrician", salt);

        var userInfo = {
            user_name: req.body.newAccount.user_name,
            email :     req.body.newAccount.email || null,
            password:   hash,
            role: req.body.newAccount.role == '' ? 'user' : req.body.newAccount.role,
            account_status:   req.body.newAccount.account_status == '' ? "Active" : req.body.newAccount.account_status,
            Pay: false,
            PaymentType: '',
            PayedDate: ''
        }
        var accountDoc = await AccountSchema.findOne({'email': userInfo.email});
        if (accountDoc == null) {
            accountDoc = await AccountSchema.create(userInfo);
            console.log("Account is registered");
            console.log(accountDoc);
            res.status(201).json({success: true, doc: accountDoc});
        } else {
            console.log("Account is alread exist");
            res.status(201).json({success: false, message: "Account is already exist"});
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({success: false, error: error});
    }
}

module.exports.resetPassword = async function (req, res) {
    console.log(req.body.accountId);
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync("electrician", salt);

        var userInfo = {
            password: hash
        }
    
        var query = { '_id': req.body.accountId }
    
        AccountSchema.update(query, userInfo, function (err, doc) {
            if (err) {
                res.status(401).json({success: false, error: err});
            } else {
                res.status(201).json({success: true, doc: doc});
            }
        })    
    } catch (error) {
        console.log(error);
        res.status(401).json({success: false, error: error});
    }
}

module.exports.setAccountAvatar = async function (req, res) {
    var userInfo = {
        avatar: req.body.path
    }

    var query = { '_id': req.body.user_id }

    AccountSchema.update(query, userInfo, function (err, doc) {
        if (err) {
            res.status(401).json({success: false, error: err});
        } else {
            res.status(201).json({success: true, doc: doc});
        }
    })
}

module.exports.changePayStatus = async function (req, res) {
    try {
        var newUser= await AccountSchema.findOne({_id: req.body.key});
        newUser.Pay = req.body.value;
        console.log("aaa");
        console.log(newUser);
        AccountSchema.update({_id: req.body.key}, newUser, function (err, doc) {
            if (err) {
                res.status(401).json({success: false, error: err});
            } else {
                res.status(201).json({success: true, doc: doc});
            }
        });
    } catch (error) {
        res.status(401).json({success: false, error: error});
    }
}

module.exports.setPayment = async function (req, res) {
    try {
        var user = await AccountSchema.findOne({_id: req.body.id});
        user.Pay = req.body.Pay;
        user.PaymentType = req.body.PaymentType;
        user.PayedDate = req.body.PayedDate;
        console.log(user);
        AccountSchema.update({_id: req.body.id}, user, function (err, doc) {
            if (err) {
                res.status(401).json({success: false, error: err});
            } else {
                res.status(201).json({success: true, doc: user});
            }
        });
    } catch(error) {
        res.status(401).json({success: false, error: error});
    }
}