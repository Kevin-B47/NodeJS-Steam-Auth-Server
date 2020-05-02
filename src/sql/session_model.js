const CFG = require('../../config');
const DBObj = require('./connectors');
const db = new DBObj();

// Most likely not needed but its here
module.exports = class Session {
	constructor(sessionId) {
		this.sessionId = sessionId;
	}

	async get() {
		return await db.query(
			`SELECT expires, data 
            FROM ${CFG.SQL_DB_TABLE} 
            WHERE sessionId = ?`,
			[ this.sessionId ]
		);
	}

	async update(data) {
		return await db.query(
			`UPDATE ${CFG.SQL_DB_TABLE}
            SET data = ?, expires = ?
            WHERE sessionId = ?`,
			[ this.sessionId, data, Date.now() + CFG.EXPIRES ]
		);
	}

	async delete() {
		return await db.query(
			`DELETE FROM ${CFG.SQL_DB_TABLE}
        	WHERE sessionId = ?`,
			[ this.sessionId ]
		);
	}
};
