const db = require('../db/connection');

exports.fetchAssessmentArea = async (project_id) => {
	let queryStr = `SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(json_build_object('type','Feature','properties',json_build_object(),'geometry',ST_AsGeoJSON(assessment_areas.geom)::json)))
         FROM assessment_areas
         WHERE project_id = $1;`;
	let queryVals = [project_id];

	const result = await db.query(queryStr, queryVals);

	if (result.rows.length === 0) {
		return Promise.reject({ status: 404, msg: 'Not Found' });
	}

	return result.rows[0].json_build_object;
};
