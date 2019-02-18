const mongo = require('mongoose');

const sessions = new mongo.Schema(
	{ _id: String, session: { passport: { user: String, ip: String } } },
	{ collection: 'sessions' }
);
const model = mongo.model('Sessions', sessions);

model.findBySteamID = async function(steamid) {
	return await this.findOne({ 'session.passport.user': steamid }).catch((err) => console.log(err));
};

model.deleteAllWithSameSteamID = async function(steamid) {
	return await this.deleteMany({ 'session.passport.user': steamid }).catch((err) => console.log(err));
};

model.deleteSession = async function(sessionId) {
	return await this.deleteOne({ _id: sessionId }).catch((err) => console.log(err));
};

model.updateSessionWithIP = async function(steamid, ip) {
	return await this.findOneAndUpdate({ 'session.passport.user': steamid }, { 'session.passport.ip': ip })
		.exec()
		.catch((err) => console.log(`Error when updating with ip ${err} ${steamid}`));
};

model.getDataFromSessionID = async function(sessionId) {
	const data = await this.findOne({ _id: sessionId }).catch((err) =>
		console.log(`Error when fetching data with sessionid ${sessionId}}`)
	);
	const { session } = data;

	const passport = session ? session.passport : null;

	if (!passport) {
		// Not logged in
		return null;
	}

	return { steam64: passport.user, ip: passport.ip };
};

module.exports = model;
