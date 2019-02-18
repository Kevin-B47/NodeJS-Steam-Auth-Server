var express = require('express');
var router = express.Router();
var steamAuth = require('../openid/steam-auth');
var Steam_API = require('../steam_api/steam_funcs');

router.get('/login', steamAuth.authenticate('openid'));

router.get('/logout', async function(req, res) {
	if (req.session && req.sessionID) {
		const steamData = await Steam_API.getSteamDataFromSessionID(req.sessionID, req.ip).catch((err) =>
			console.log(`Error when logging out ${err}`)
		);

		if (steamData) {
			req.session.destroy();
			return res.send({ msg: 'You have sucessfully logged out' });
		}
	}
	return res.send({ msg: 'No need to logout' });
});

router.get('/get', async function(req, res, next) {
	if (req.sessionID) {
		const steamData = await Steam_API.getSteamDataFromSessionID(req.sessionID, req.ip).catch((err) =>
			console.log(`Error when using get route ${err}`)
		);

		if (!steamData) {
			return res.status(401).send({ error: 'No data found' });
		}

		return res.status(200).send(steamData);
	} else {
		return res.status(204).send('');
	}
});

router.get('/return', steamAuth.authenticate('openid', { successRedirect: '/', failureRedirect: '/' }), function(
	req,
	res
) {
	const { identifier, steamId } = req.user;
	if (identifier && steamId) {
		return res.redirect('/');
	} else {
		return res.redirect(400, '/');
	}
});
module.exports = router;
