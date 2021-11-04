const db = require('../db/connection');

exports.addComment = async (newComment) => {
	let queryStr = `INSERT INTO comments (receptor_id, impact, comment) VALUES ($1, $2, $3) RETURNING *;`;
	let queryVals = [
		newComment.receptor_id,
		newComment.impact,
		newComment.comment,
	];

	const result = await db.query(queryStr, queryVals);

	if (result.rows.length === 0) {
		return Promise.reject({ status: 404, msg: 'Not Found' });
	}

	return result.rows[0];
};
