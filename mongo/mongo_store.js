const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore(
	{
		uri: 'mongodb://localhost:27017',
		databaseName: 'steam_sessions',
		collection: 'sessions'
	},
	function(error) {
		if (typeof error !== 'undefined') {
			console.log('mongodb error', error);
		}
	}
);

module.exports = store;
