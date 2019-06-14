var AccountSchema = require('../schemas/account_schema.js');

var jwt = require('jsonwebtoken');

var bcrypt = require('bcryptjs');

module.exports.register = async function (req, res) {
 
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);

        var userInfo = {
            user_name: req.body.userName,
            email :     req.body.email || null,
            password:   hash,
            role:   "user",
            Pay: false,
            PaymentType: '',
            PayedDate: '',
            account_status: req.body.account_status
        }

        var accountDoc = await AccountSchema.findOne({'email': userInfo.email});
        if (accountDoc == null) {
            accountDoc = await AccountSchema.create(userInfo);
            console.log("User is registered");
            console.log(accountDoc);
            res.status(201).json({success: true, doc: accountDoc});
        } else {
            console.log("User is alread exist");
            res.status(201).json({success: false, message: "User is already exist"});
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({success: false, error: error});
    }
    
}
  
/*
module.exports.sendSmsVerifyCode = function (req, res) {

    console.log("[Generate Sms verify code] => ");

    var expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 2);

    var code = "";
    var possible = "012345678987654321012345678909876543210";
  
    for (var i = 0; i < 5; i++) {
        code += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    var smsVerifyToken = jwt.sign({
        phoneNumber: req.body.phone,
        verifyCode: code,
        exp: parseInt(expiry.getTime() / 1000)
    }, "bAKVdqczerYAYKdMxsaBzbFUJU6ZvL2LwZuxhtpS");
    console.log("Phone Number : ", req.body.phone + " Verify Code: " + code);
    res.status(201).json({'verifyToken' : smsVerifyToken});
}

module.exports.smsVerifyTokenCheck = function (req, res) {
    var token = req.body.verifyToken;
    var code = req.body.code;
    if ( token && code) {
        jwt.verify(token, 'bAKVdqczerYAYKdMxsaBzbFUJU6ZvL2LwZuxhtpS', function(err, decoded) {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    console.log("Verifying Sms token => Token Expired");
                    res.status(401).json({"message": "Verifying Sms token => failed", "type": "token-exp"});
                } else {
                    console.log("Verifying Sms token => Faild");
                    res.status(401).json({"message": "Verifying Sms token => failed"});
                }
            } else {
                if (decoded.verifyCode == code) {
                    console.log("Phone " + decoded.phoneNumber + " => Sms verify Successed");
                    res.status(201).json({"success": true, "message" : "Sms Verify Successed."})
                } else {
                    console.log("Phone " + decoded.phoneNumber + " => Verify code doesn't match");
                    res.status(401).json({"success": false, "message": "Verify code doesn't match"});
                }
            }
        });
    }
}
*/