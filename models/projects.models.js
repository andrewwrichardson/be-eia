const db = require('../db/connection');

exports.fetchProjects = async () => {
	var queryStr = `SELECT * FROM projects;`;
	const result = await db.query(queryStr);

	if (result.rows.length === 0) {
		return Promise.reject({ status: 404, msg: 'Not Found' });
	}

	return result.rows;
};
