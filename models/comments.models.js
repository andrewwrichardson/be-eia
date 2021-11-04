const db = require('../db/connection');

exports.fetchComments = async (project_id) => {
	let queryStr = `SELECT * FROM receptors
    INNER JOIN comments ON receptors.receptor_id = comments.comment_id
    WHERE project_id = $1;`;
	let queryVals = [project_id];

	const result = await db.query(queryStr, queryVals);

	if (result.rows.length === 0) {
		return Promise.reject({ status: 404, msg: 'Not Found' });
	}

	return result.rows;
};

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

exports.editComment = async (comment_id, updatedComment) => {
	if (
		updatedComment.impact !== undefined &&
		updatedComment.comment !== undefined
	) {
		queryStr = `UPDATE comments SET impact = $1, comment = $2 WHERE comment_id = $3 RETURNING *;`;
		queryVals = [updatedComment.impact, updatedComment.comment, comment_id];
	} else if (updatedComment.impact !== undefined) {
		queryStr = `UPDATE comments SET impact = $1 WHERE comment_id = $2 RETURNING *;`;
		queryVals = [updatedComment.impact, comment_id];
	} else if (updatedComment.comment !== undefined) {
		queryStr = `UPDATE comments SET comment = $1 WHERE comment_id = $2 RETURNING *;`;
		queryVals = [updatedComment.comment, comment_id];
	}
	const result = await db.query(queryStr, queryVals);

	if (result.rows.length === 0) {
		return Promise.reject({ status: 404, msg: 'Not Found' });
	}

	return result.rows[0];
};
