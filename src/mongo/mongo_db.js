const mongoose = require('mongoose');
const MakeMongoURI = require('./mongo_uri');
mongoose.connect(MakeMongoURI(), { useNewUrlParser: true });
mongoose.set('useFindAndModify', false); // Removes deprecation error
const db = mongoose.connection;

db.on('error', (err) => {
	console.log('MongoDB Connection Error: ', err);
});

db.on('open', function() {
	console.log('MongoDB Connection OPEN');
});

module.exports = mongoose;
