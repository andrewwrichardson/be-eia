const db = require('../db/connection');

exports.fetchReceptors = async (project_id) => {
	let queryStr = `SELECT * FROM receptors WHERE project_id = $1;`;
	let queryVals = [project_id];

	const result = await db.query(queryStr, queryVals);

	if (result.rows.length === 0) {
		return Promise.reject({ status: 404, msg: 'Not Found' });
	}

	console.log('receptors model ----> \n', result.rows);
};
