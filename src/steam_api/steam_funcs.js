var axios = require('axios');
var SteamID = require('steamid');
var CFG = require('../../config');

const steamapiKey = CFG.STEAM_API_KEY;

const getFromUser = (user) => {
	if (typeof user !== 'undefined') {
		const { steamid, steam64, name } = user;
		return {
			steamid,
			steam64,
			name
		};
	}
};

module.exports.getFromUser = getFromUser;
