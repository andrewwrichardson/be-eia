const db = require('../db/connection');

exports.fetchProjects = async (project_id) => {
    if (!isNaN(project_id) && project_id !== undefined) {
        var queryStr = `SELECT * FROM projects WHERE project_id = $1;`;
        var queryVals = [project_id];
    } else {
        var queryStr = `SELECT * FROM projects;`;
        var queryVals = [];
    }
    const result = await db.query(queryStr, queryVals);

    if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'Not Found' });
    }

    if (!isNaN(project_id) && project_id !== undefined) {
        return result.rows[0];
    }
    return result.rows;
};

exports.addProject = async (newProject) => {
    var queryStr = `INSERT INTO projects (project_name, image_url) 
    VALUES ($1, $2) RETURNING *;`;
    var queryVals = [newProject.project_name, newProject.image_url];

    const result = await db.query(queryStr, queryVals);

    if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'Not Found' });
    }

    return result.rows[0];
};

exports.updateProject = async (project_id, newProject) => {
    if (
        newProject.project_name !== undefined &&
        newProject.image_url !== undefined
    ) {
        var queryStr = `UPDATE projects SET project_name = $1, image_url = $2
    WHERE project_id = $3 RETURNING *;`;
        var queryVals = [
            newProject.project_name,
            newProject.image_url,
            project_id,
        ];
    } else if (newProject.project_name !== undefined) {
        var queryStr = `UPDATE projects SET project_name = $1
    WHERE project_id = $2 RETURNING *;`;
        var queryVals = [newProject.project_name, project_id];
    } else if (newProject.image_url !== undefined) {
        var queryStr = `UPDATE projects SET image_url = $1
    WHERE project_id = $2 RETURNING *;`;
        var queryVals = [newProject.image_url, project_id];
    }

    const result = await db.query(queryStr, queryVals);

    if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'Not Found' });
    }

    return result.rows[0];
};
