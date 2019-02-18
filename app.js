require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var mongoStore = require('./mongo/mongo_store');
var mongodb = require('./mongo/mongo_db');

var app = express();

var openidPassport = require('./openid/steam-auth');
app.use(openidPassport.initialize());
app.use(openidPassport.session());

var CFG = require('./config');

app.use(
	session({
		secret: CFG.SESSION_SECRET,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7
		},
		store: mongoStore,

		saveUninitialized: true,
		resave: false
	})
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
