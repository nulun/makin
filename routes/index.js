var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Recipe = require('../models/recipe');
var Profile = require('../models/profile');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: 'public/images/user-avatars' });

router.get('/', function(req, res) {
  if (req.user) {
    Profile.find({ 'username': req.user.username }).exec((err, doc) => {
      var userObj = {};
      if (doc[0]) {
        if (doc[0].name) {
          userObj.username = doc[0].name;
        };
        //---------------
        if (doc[0].avatar) {
          var avatarPath = doc[0].avatar.path.substr(6);
          userObj.avatar = 'url("' + avatarPath + '")';
          console.log(userObj.avatar);
        };
      } else {
        userObj.username = req.user.username;
        userObj.avatar = 'url("/images/user-avatars/user.png")';
      };
      res.render('home', { user: userObj });
    });

  } else {
    res.render('door', { user: req.user });

  }
});

router.get('/register', function(req, res) {
  res.render('home', {});
});

router.post('/verify', function(req, res) {
  console.log("用户试图以" + req.body.username + "为用户名注册");
  Account.findOne({ username: req.body.username }, function(err, docs) {
    var taken = true,
      untaken = false;
    if (err) {
      console.log(err);
    };
    //console.log(docs);  -->  { _id: 58ed8dbf60d984030f3480fa, username: 'admin', __v: 0 }
    if (docs) {
      console.log("但是这个用户名已经被注册了")
      res.send(taken);
    } else {
      res.send(untaken);
    }
  })
});

router.post('/register', function(req, res) {
  Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
    if (err) {
      //return res.render('home', { account: account });
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
  res.status(200).send("pong!");
});

router.get('/profile', function(req, res) {
  if (req.user) {
    Profile.find({ 'username': req.user.username }).exec((err, doc) => {
      var userObj = {};
      //---------------
      if (doc[0]) {
        if (doc[0].name) {
          userObj.username = doc[0].name;
        };
        //---------------
        if (doc[0].avatar) {
          userObj.avatar = doc[0].avatar;
          var avatarPath = doc[0].avatar.path.substr(6);
          userObj.avatar = 'url("' + avatarPath + '")';
          console.log(userObj.avatar);
        };
      } else {
        userObj.username = req.user.username;
        userObj.avatar = 'url("/images/user-avatars/user.png")';
      };
      //---------------
      res.render('profile', { user: userObj });
    });
    console.log(req.user.username + "打开了其账户资料");
  } else {
    res.render('door');
    console.log("未登陆，跳转到登陆页面");
  };
});

//=======================================================

router.put('/update/profile/name', function(req, res) {
  if (req.user) {
    const query = { 'username': req.user.username };
    const doc = { 'name': req.body.name };
    var options = { upsert: true };

    function callback(err, num) {
      //console.log(err);
      //console.log(num);
    };
    if (req.body.name !== '') {
      Profile.update(query, doc, options, callback);
    };

    //console.log(req.user.username);
    //console.log(req.body.name);
    res.status(200).send("successful!");
  } else {
    res.redirect('/');
    console.log("未登陆无法进行此操作，跳转到登陆页面");
  };
});

//=====================================================

router.post('/update/profile/avatar', upload.single('avatar'), function(req, res, next) {
  if (req.user) {

    if (req.file) {

      const query = { 'username': req.user.username };
      const doc = { avatar: { 'path': req.file.path, 'contentType': req.file.mimetype } };
      var options = { upsert: true };

      function callback(err, num) {
        //console.log(err);
      };
      Profile.find(query).exec((err, doc) => {
        var deleteUrl = doc[0].avatar.path;
        fs.unlink( deleteUrl, (err) => {
          if (err) throw err;
          console.log('原头像' + doc[0].avatar.path + '已删除');
        });
      })
      Profile.update(query, doc, options, callback);
    };
    res.status(200).send("更新成功");

  } else {
    res.render('/');
    console.log("未登陆，跳转到登陆页面");
  };
});

module.exports = router;

