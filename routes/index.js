var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Recipe = require('../models/recipe'); //add
var router = express.Router();


router.get('/', function(req, res) {
    res.render('index', { user: req.user });
});

router.get('/register', function(req, res) {
    res.render('register', {});
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account: account });
        }

        passport.authenticate('local')(req, res, function() {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user: req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res) {
    res.status(200).send("pong!");
});

// add
router.get('/share', function(req, res) {
    res.render('share');
});

router.post('/share', function(req, res) {
    if (err) {
        console.log(err);
    }
    var recipeEntity = new Recipe({ recipe_name: req.body.recipe_name }, { food_materials: req.body.food_materials }, { cook_time: req.body.cook_time }, { tips: req.body.tips });
    recipeEntity.save();
});

module.exports = router;

