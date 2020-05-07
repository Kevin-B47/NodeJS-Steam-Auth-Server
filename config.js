var fs = require('fs');

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
		ON_AUTH_RETURN_URL
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
		ON_AUTH_RETURN_URL
	};
} else {
	throw 'You need a .env file to run this';
}
