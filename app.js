var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var DB = require('./src/sql/connectors');

var CFG = require('./config');

var indexRouter = require('./src/routes/index');
var authRouter = require('./src/routes/auth');

const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const db = new DB();
var sessionStore = new MySQLStore(db.details());

db.connection().connect((err) => {
	if (err) {
		console.log(`DB ERROR: ${err}`);
	} else {
		console.log('DB Connection was successful');
	}
});

var app = express();
app.use(cors({ origin: CFG.CORS_ORIGIN, credentials: true }));

var openidPassport = require('./src/openid/steam-auth');

app.use(
	session({
		secret: CFG.SESSION_SECRET,
		cookie: {
			maxAge: Number(CFG.EXPIRATION)
		},
		store: sessionStore,
		saveUninitialized: false,
		resave: true
	})
);

app.use(openidPassport.initialize());
app.use(openidPassport.session());

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
	res.status(err.status || 500);
	if (CFG.SHOW_ERRORS === 'true') {
		res.json({ error: err.message });
	} else {
		res.json({ error: 'Internal Error' });
	}
});

module.exports = app;
