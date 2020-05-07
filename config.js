var fs = require('fs');
const CFG = {
	development: {
		PORT: 8080,
		STEAM_API_KEY: '',
		SESSION_SECRET: 'SjF1hpOzC9twAq^rk9R!x9', // dummy secrets, dont actually use these
		MONGO_IP: 'localhost',
		MONGO_PORT: 27017,
		MONGO_DB_USER: '',
		MONGO_DB_PASS: '',
		MONGO_DB_COLLECTION: 'sessions',
		MONGO_DB_NAME: 'steam_sessions',
		OPENID_RETURN_URL: 'http://localhost:8080/auth/return',
		OPENID_REALM_URL: 'http://localhost:8080/',
		CORS_ORIGIN: 'http://localhost:3000'
	},
	production: {
		PORT: 8080,
		STEAM_API_KEY: '',
		SESSION_SECRET: '3Wuu#OrA0QnU2WbRK0$CUPKRXh47CjF^y0JPz25j3R',
		MONGO_IP: 'localhost',
		MONGO_PORT: 27017,
		MONGO_DB_USER: '',
		MONGO_DB_PASS: '',
		MONGO_DB_COLLECTION: 'sessions',
		MONGO_DB_NAME: 'steam_sessions',
		OPENID_RETURN_URL: 'http://localhost:8080/auth/return',
		OPENID_REALM_URL: 'http://localhost:8080/',
		CORS_ORIGIN: 'http://localhost:3000'
	}
};

if (fs.existsSync('.env')) {
	// If we have the env file we will use it
	const {
		PORT,
		STEAM_API_KEY,
		SESSION_SECRET,
		SQL_IP,
		SQL_PORT,
		SQL_DB_USER,
		SQL_DB_PASS,
		SQL_DB_NAME,
		SQL_DB_TABLE,
		EXPIRATION,
		SHOW_ERRORS,
		CHECK_INTERVAL,
		CLEAR_EXPIRED,
		OPENID_RETURN_URL,
		OPENID_REALM_URL,
		CORS_ORIGIN,
		SHOP_URL
	} = process.env;

	module.exports = {
		PORT,
		STEAM_API_KEY,
		SESSION_SECRET,
		SQL_IP,
		SQL_PORT,
		SQL_DB_USER,
		SQL_DB_PASS,
		SQL_DB_NAME,
		SQL_DB_TABLE,
		EXPIRATION,
		SHOW_ERRORS,
		CHECK_INTERVAL,
		CLEAR_EXPIRED,
		OPENID_RETURN_URL,
		OPENID_REALM_URL,
		CORS_ORIGIN,
		SHOP_URL
	};
} else {
	module.exports = CFG[process.env.NODE_ENV] || CFG.development;
}
