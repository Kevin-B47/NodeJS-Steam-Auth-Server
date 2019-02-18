const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/steam_sessions', { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;

db.on('error', (err) => {
	console.log('MongoDB Connection Error: ', err);
});

db.on('open', function() {
	console.log('MongoDB Connection OPEN');
});

module.exports = mongoose;
