var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Recipe = require('../models/recipe');
var router = express.Router();


router.get('/', function(req, res) {
    if (req.user) {
        res.render('home', { user: req.user });

    } else {
        res.render('door', { user: req.user });

    }
});

router.get('/register', function(req, res) {
    res.render('home', {});
});

router.post('/verify', function(req, res) {
    console.log("用户试图以"+ req.body.username + "为用户名注册");
    Account.findOne({ username: req.body.username }, function(err, docs) {
        var taken = true, untaken = false;
        if (err) {
            console.log(err);
        };
        //console.log(docs);  -->  { _id: 58ed8dbf60d984030f3480fa, username: 'admin', __v: 0 }
        if (docs) {
            console.log("但是这个用户名已经被注册了")
            res.send(taken);
        }else{
            res.send(untaken);
        }
    })
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('home', { account: account });
        }

        passport.authenticate('local')(req, res, function() {
            console.log("注册成功，跳转到Home...");
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('home', { user: req.user });
});

router.post('/login', passport.authenticate('local', { failureFlash: true }), function(req, res) {
    res.redirect('/');
    console.log(req.user.username + "成功登陆！")
        //console.log(req.user);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res) {
    res.status(401).send("pong!");
});



module.exports = router;

