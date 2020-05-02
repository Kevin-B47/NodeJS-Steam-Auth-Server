const CFG = require('../../config');
const mysql = require('mysql');
const util = require('util');

const getDBConnectionDetails = () => {
	const { SQL_IP, SQL_PORT, SQL_DB_USER, SQL_DB_PASS, SQL_DB_NAME, CLEAR_EXPIRED, EXPIRATION, CHECK_INTERVAL } = CFG;

	return {
		host: SQL_IP,
		port: SQL_PORT,
		user: SQL_DB_USER,
		password: SQL_DB_PASS,
		database: SQL_DB_NAME,
		clearExpired: CLEAR_EXPIRED,
		expiration: EXPIRATION,
		checkExpirationInterval: CHECK_INTERVAL,
		createDatabaseTable: true,
		schema: {
			tableName: CFG.SQL_DB_TABLE,
			columnNames: {
				session_id: 'sessionId',
				expires: 'expires',
				data: 'data'
			}
		}
	};
};

var db = mysql.createConnection(getDBConnectionDetails());

class DB {
	constructor() {
		this.db = db;
	}

	async query(sql, args) {
		return util.promisify(this.db.query).call(this.db, sql, args);
	}
	async close() {
		return util.promisify(this.db.end).call(this.db);
	}
	connection() {
		return this.db;
	}
	details() {
		return getDBConnectionDetails();
	}
}

module.exports = DB;
