const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MakeMongoURI = require('./mongo_uri');

var store = new MongoDBStore({ uri: MakeMongoURI() }, function(error) {
	if (typeof error !== 'undefined') {
		console.log('mongodb error', error);
	}
});

module.exports = store;
