const db = require('../db/connection');

exports.fetchProjects = async () => {
	var queryStr = `SELECT * FROM projects;`;
	const result = await db.query(queryStr);

	if (result.rows.length === 0) {
		return Promise.reject({ status: 404, msg: 'Not Found' });
	}

	return result.rows;
};

exports.addProject = async (newProject) => {
	var queryStr = `INSERT INTO projects (project_name) 
    VALUES ($1) RETURNING *;`;
	var queryVals = [newProject.project_name];

	const result = await db.query(queryStr, queryVals);

	if (result.rows.length === 0) {
		return Promise.reject({ status: 404, msg: 'Not Found' });
	}

	return result.rows[0];
};

exports.updateProject = async (project_id, newProject) => {
	var queryStr = `UPDATE projects SET project_name = $1
    WHERE project_id = $2 RETURNING *;`;
	var queryVals = [newProject.project_name, project_id];

	const result = await db.query(queryStr, queryVals);

	if (result.rows.length === 0) {
		return Promise.reject({ status: 404, msg: 'Not Found' });
	}

	return result.rows[0];
};
