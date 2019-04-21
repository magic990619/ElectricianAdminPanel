const express = require('express');
const path = require('path');
var cors = require('cors')
const paypal = require('paypal-rest-sdk');
const engines = require('consolidate');

const Auth = require('./modules/auth/router.js');
const Category = require('./modules/category/router.js');
const Content = require('./modules/content/router.js');

require('./config/db_connection.js');
require('./config/passport.js');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var multer = require('multer');
const app = express();

app.use(cors())

var cookieParser = require('cookie-parser');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
            var err = new Error();
            err.code = 'filetype';
            return cb(err);
        } else {
            cb(null, Date.now() + '-' +  file.originalname);
        }
    }
})

var upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }
}).single('file');

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(cookieParser());

app.engine("ejs", engines.ejs);
app.set("views", "./views");
app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json 
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AfMTFW2wPKd7kBLUKCXDudyPPs6DcIQMJEQOoIEpdt8N7bkK6b-nViaBhuagO_8eosVfcnCYQ9nrAyGj',
    'client_secret': 'ELYDaGPoBqAL0NI2E2mQ1xPdwwtyYDfG59A9M1yNDo5b51eJWhfAClJGcblUSCZplsdSCe0VCAjVv1-f'
});

  
app.use('/auth', Auth);
app.use('/category', Category);
app.use('/content', Content);

app.get('/paypalindex', (req, res) => {
    res.render("index");
});

app.get('/paypal', (req, res) => {
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://192.168.100.124:80/success",
            "cancel_url": "http://192.168.100.124:80/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": "1.99",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "1.99"
            },
            "description": "This is the payment description."
        }]
    };
    
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            res.redirect(payment.links[1].href);
        }
    });
});

app.get('/paypalFull', (req, res) => {
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://192.168.100.124:80/successFull",
            "cancel_url": "http://192.168.100.124:80/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": "4.99",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "4.99"
            },
            "description": "This is the payment description."
        }]
    };
    
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            res.redirect(payment.links[1].href);
        }
    });
});

app.get("/success", (req,res) => {
    var PayerID = req.query.PayerID;
    var paymentId = req.query.paymentId;
    var execute_payment_json = {
        "payer_id": PayerID,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "1.99"
            }
        }]
    };
        
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.render('success');
        }
    });
});

app.get("/successFull", (req,res) => {
    var PayerID = req.query.PayerID;
    var paymentId = req.query.paymentId;
    var execute_payment_json = {
        "payer_id": PayerID,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "4.99"
            }
        }]
    };
        
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.render('success');
        }
    });
});

app.get("/cancel", (req,res) => {
    res.render("Cancel");
});


app.get('*', (req,res) =>{
    console.log("loading");
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

// FileUpload

app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                res.json({ success: false, message: 'The file size is too big! Max. 10MB' });
            } else if (err.code === 'filetype') {
                res.json({ success: false, message: 'The file does not match the desired file format! (JPG, JPEG, PNG)'});
            }else {
                console.log(err);
                res.json({success: false, message: 'The upload of the file could not be completed.'});
            }
        }else{
            if(!req.file){
                res.json({success: false, message: 'No file was selected for upload!'});
            }else{
                res.json({success: true, message: 'The file has been uploaded successfully.', file: req.file});
            }
        }
    })
})


// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : err.name + ": " + err.message});
    }
  });


// web server 8080

app.listen(80, () => console.log('-- [ ELECTRICIAN NODE ] SERVER STARTED LISTENING ON PORT 80 --'));

// Socket Server Engine

var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 8889;

server.listen( port ,function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("-- [ ELECTRICIAN SOCKET ] "+" SERVER STARTED ON PORT " + port + " --");
    // console.log(server);
});
