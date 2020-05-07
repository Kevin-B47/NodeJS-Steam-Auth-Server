// Got the setup from https://codepen.io/johnchristopherjones/post/setting-up-openid thanks!
var SteamStrategy = require('passport-steam').Strategy;
var CFG = require('../../config');
var passport = require('passport');
var SteamHelper = require('steamid');

passport.use(
	new SteamStrategy(
		{
			// OpenID provider configuration
			providerURL: 'http://steamcommunity.com/openid',
			returnURL: CFG.OPENID_RETURN_URL,
			realm: CFG.OPENID_REALM_URL,
			apiKey: CFG.STEAM_API_KEY,
			passReqToCallback: true
		},
		// Validation callback
		async function(req, identifier, profile, done) {
			process.nextTick(function() {
				if (!profile || !profile._json) {
					return done(null, false, { message: 'Invalid login' });
				}

				const { steamid, personaname, avatarfull } = profile._json;

				const steamData = new SteamHelper(steamid);

				if (!steamData.isValid()) {
					console.log(steamid + 'was invalid??');
					return done(null, false, { message: 'Invalid login' });
				}

				const store = {
					steam64: steamid,
					steamid: steamData.getSteam2RenderedID(),
					name: personaname,
					avatar: avatarfull,
					ip: req.ip,
					identifier: identifier
				};

				return done(null, store);
			});
		}
	)
);

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

module.exports = passport;
