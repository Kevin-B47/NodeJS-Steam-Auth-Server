const getFromUser = (user) => {
	if (typeof user !== 'undefined') {
		const { steamid, steam64, name, avatar } = user;
		return {
			steamid,
			steam64,
			name,
			avatar
		};
	}
};

module.exports.getFromUser = getFromUser;
