// dependencies
var express = require('express');
var path = require('path');

//http 跳转 https
var forceSSL = require('express-force-ssl');

//https
var http = require('follow-redirects').http;
var https = require('follow-redirects').https;
var fs = require('fs');
var options = {
    key: fs.readFileSync('./cert/2_cook-share.com.key'),
    cert: fs.readFileSync('./cert/1_cook-share.com_bundle.crt')
};

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//recipe model
var Recipe = require('./models/recipe');

//路由
var routes = require('./routes/index');
var share = require('./routes/share')

//https
var app = express();
var server = http.createServer(app);
var secureServer = https.createServer(options, app);
app.use(forceSSL);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//在模板中使用user变量，注意要在passport之后，route之前声明
app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
});

//路由
app.use('/', routes);
app.use('/share', share);

// passport的东西
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


// 连接mongoose
mongoose.connect('mongodb://localhost/cookshare');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


//https
//https.createServer(options, app).listen(443);

secureServer.listen(443);

module.exports = app;
