var express = require('express');
var router = express.Router();
var steamAuth = require('../openid/steam-auth');
var Session = require('../sql/session_model');
var Steam_API = require('../steam_api/steam_funcs');
var CFG = require('../../config');

router.get('/login', steamAuth.authenticate('steam'));

router.get('/logout', async function(req, res) {
	if (req.isAuthenticated()) {
		const session = new Session(req.sessionID);
		session.delete().catch((err) => console.log(err));
		req.logout();
		res.status(200).json({ msg: 'You have logged out.' });
	} else {
		res.status(403).json({ error: 'false' });
	}
});

router.get('/get', ensureAuthenticated, async function(req, res, next) {
	return res.status(200).json(Steam_API.getFromUser(req.user));
});

router.get(
	'/return',
	// Issue #37 - Workaround for Express router module stripping the full url, causing assertion to fail
	function(req, res, next) {
		req.url = req.originalUrl;
		next();
	},
	steamAuth.authenticate('steam', { failureRedirect: '/' }),
	function(req, res) {
		res.redirect(CFG.ON_AUTH_RETURN_URL);
	}
);

function ensureAuthenticated(req, res, next) {
	const isAuthed = req.isAuthenticated();
	if (isAuthed && req.ip === req.user.ip) {
		return next();
	} else if (isAuthed) {
		console.log(`${req.ip} didn't match ${req.user.ip} terminating session for ${JSON.stringify(req.user)}`);
		req.logout();
		const session = new Session(req.sessionId);
		session.delete().catch((err) => console.log(err));
	}
	return res.status(401).json({ error: 'false' });
}

module.exports = router;
