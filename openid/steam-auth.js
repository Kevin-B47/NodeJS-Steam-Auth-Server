// Got the setup from https://codepen.io/johnchristopherjones/post/setting-up-openid thanks!

var SessionModel = require('../mongo/session_funcs');
var OpenIDStrategy = require('passport-openid').Strategy;

var SteamStrategy = new OpenIDStrategy(
	{
		// OpenID provider configuration
		providerURL: 'http://steamcommunity.com/openid',
		stateless: true,
		// How the OpenID provider should return the client to us
		returnURL: 'http://localhost:3000/auth/return',
		realm: 'http://localhost:3000/',
		passReqToCallback: true
	},
	// Validation callback
	async function(req, identifier, done) {
		let steamid = identifier.match(/\d+$/)[0];

		var user = { identifier: identifier, steamId: steamid, ip: req.ip };

		if (typeof steamid === 'undefined' || steamid == null) {
			return done(null, false, { message: 'Error logging in' });
		}

		await SessionModel.deleteAllWithSameSteamID(steamid); // Clear all sessions with same steamid

		done(null, user); // Insert session

		await SessionModel.updateSessionWithIP(steamid, req.ip); // Update it with IP to add another layer of security
	}
);
var passport = require('passport');
passport.use(SteamStrategy);

passport.serializeUser(function(user, done) {
	done(null, user.steamId);
});

passport.deserializeUser(function(identifier, done) {
	done(null, {
		identifier: identifier,
		steamId: identifier.match(/\d+$/)[0]
	});
});

module.exports = passport;
