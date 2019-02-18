var fs = require('fs');
const CFG = {
	development: {
		STEAM_API_KEY: '',
		SESSION_SECRET: ''
	},
	production: {
		STEAM_API_KEY: '',
		SESSION_SECRET: ''
	}
};

if (fs.existsSync('.env')) {
	// If we have the env file we will use it
	module.exports = {
		STEAM_API_KEY: process.env.STEAM_API_KEY,
		SESSION_SECRET: process.env.SESSION_SECRET
	};
} else {
	module.exports = CFG[process.env.NODE_ENV] || CFG.development;
}
