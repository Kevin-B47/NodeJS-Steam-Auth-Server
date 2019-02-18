var express = require('express');
var router = express.Router();
var Steam_API = require('../steam_api/steam_funcs');

router.get('/', async function(req, res, next) {
	if (req.sessionID) {
		const steamData = await Steam_API.getSteamDataFromSessionID(req.sessionID, req.ip).catch((err) =>
			console.log(`Error when fetching index ${err}`)
		);

		if (steamData) {
			return res.send(steamData);
		}
	}
	return res.status(401).send('You have no session data!');
});

module.exports = router;
