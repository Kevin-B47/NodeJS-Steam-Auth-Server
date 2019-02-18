var axios = require('axios');
var SteamID = require('steamid');
var SessionModel = require('../mongo/schemas/session_schema');
var CFG = require('../../config');

const steamapiKey = CFG.STEAM_API_KEY;

const getSteamProfileData = async (steam64) => {
	return await axios
		.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamapiKey}&steamids=${steam64}`)
		.catch((err) => console.log(`Error wehen fetching profile data with ${steam64}`));
};

const isSteam64Valid = (steam64) => {
	steamObj = new SteamID(steam64);
	return steamObj.isValid();
};

const parseSingleProfileData = (profileData) => {
	const { response } = profileData;
	if (response === null) {
		return null;
	}

	const { players } = response;

	if (!players || players.length < 1) {
		console.log(`Error, no player data returned for ${JSON.stringify(profileData)}`);
		return null;
	}

	const singleData = players[0];

	if (!singleData) {
		console.log(`Error, no singledata found for ${JSON.stringify(profileData)}`);
		return null;
	}
	const { personaname, steamid, avatar, avatarmedium, avatarfull } = singleData;

	const steamObj = new SteamID(steamid);

	return {
		name: personaname,
		smallAvatar: avatar,
		mediumAvatar: avatarmedium,
		largeAvatar: avatarfull,
		steam64: steamid,
		steamid: steamObj.getSteam2RenderedID
	};
};

const getSteamDataFromSteam64 = async (steam64) => {
	const steamFetch = isSteam64Valid(steam64) ? await getSteamProfileData(steam64) : null;

	if (!steamFetch) {
		console.log(`Error validating steam64 data ${steam64}`);
		return {
			name: '',
			profilePic: '',
			steam64: '',
			steamid: ''
		};
	}

	return parseSingleProfileData(steamFetch.data);
};

const getSteamDataFromSessionID = async (sessionID, reqIP) => {
	const data = await SessionModel.getDataFromSessionID(sessionID).catch((err) =>
		console.log(`Error when getting steamdata from session ${sessionID}`)
	);
	if (!data) {
		return null;
	}

	const { ip, steam64 } = data;

	if (!ip || !steam64) {
		return null;
	}

	if (ip !== reqIP || steam64 === '') {
		console.log(
			`Error, deleting session due to possible invalid properites. Found IP: ${ip} Req IP: ${reqIP} steam64: ${steam64}`
		);
		await SessionModel.deleteSession(sessionID).catch((err) =>
			console.log(`Error when deleing invalid session ${steam64} ${sessionID}`)
		);
		return null;
	}

	return await getSteamDataFromSteam64(steam64).catch((err) => console.log(err));
};

module.exports.getSteamProfileData = getSteamProfileData;
module.exports.parseSingleProfileData = parseSingleProfileData;
module.exports.isSteam64Valid = isSteam64Valid;
module.exports.getSteamDataFromSessionID = getSteamDataFromSessionID;
module.exports.getSteamDataFromSteam64 = getSteamDataFromSteam64;
