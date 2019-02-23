const CFG = require('../../config');

const { MONGO_IP, MONGO_PORT, MONGO_DB_USER, MONGO_DB_PASS, MONGO_DB_COLLECTION, MONGO_DB_NAME } = CFG;

function MakeURI() {
	if (MONGO_DB_USER && MONGO_DB_PASS && MONGO_DB_PASS !== '' && MONGO_DB_USER !== '') {
		return `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASS}@${MONGO_IP}:${MONGO_PORT}/${MONGO_DB_NAME}`;
	} else {
		return `mongodb://${MONGO_IP}:${MONGO_PORT}/${MONGO_DB_NAME}`;
	}
}

module.exports = MakeURI;
