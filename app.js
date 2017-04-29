//===========================================================================

var express = require('express');
var path = require('path');

//===========================================================================

var forceSSL = require('express-force-ssl'); //http 跳转 https

//===========================================================================

var http = require('follow-redirects').http; //http
var https = require('follow-redirects').https; //https

var compression = require('compression'); //压缩传输

//===========================================================================

var fs = require('fs');

//===========================================================================
var options = {
  key: fs.readFileSync('./cert/2_cook-share.com.key'), //SSL证书
  cert: fs.readFileSync('./cert/1_cook-share.com_bundle.crt')
};
//===========================================================================

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

//===========================================================================

var multer = require('multer'); //上传文件
var upload = multer({ dest: 'uploads/' });

//===========================================================================

var Recipe = require('./models/recipe'); //引入model
var Profile = require('./models/profile');

//===========================================================================

var routes = require('./routes/index'); //路由
var share = require('./routes/share');

//===========================================================================

var flash = require('connect-flash'); //flash消息

//===========================================================================
/***************************************/
var app = express(); /**********************************/
//===========================================================================

var server = http.createServer(app); //设置http服务器
var secureServer = https.createServer(options, app); //设置https服务器
app.use(forceSSL); //使用跳转https中间件
secureServer.listen(443); //https监听443端口

//===========================================================================

app.set('views', path.join(__dirname, 'views')); //设置views文件夹目录
app.set('view engine', 'jade'); //设置jade为默认模板

//===========================================================================

app.use(favicon(__dirname + '/public/favicon.png')); //favicon

//===========================================================================

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

//===========================================================================

app.use(compression());
app.use(express.static(path.join(__dirname, 'public'))); //public目录位置

//===========================================================================

app.use(flash());

//===========================================================================

app.use(function(req, res, next) {
  res.locals.user = req.user; //在jade模板中使用user变量，注意要在passport之后，route之前声明
  next();
});

//===========================================================================

app.use('/', routes);
app.use('/share', share);

//===========================================================================

var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate())); //passport的东西
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//===========================================================================

mongoose.connect('mongodb://localhost/cookshare'); //连接到mongodb

//===========================================================================

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

//===============================================================================
/*****************************************/
module.exports = app; /************************************/
//===============================================================================

