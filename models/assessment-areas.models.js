const format = require('pg-format');
const db = require('../db/connection');
const {
	jsToPgFormatAssessmentAreas,
} = require('../db/utils/data-manipulation.utils');

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

exports.addAssessmentArea = async (assessment_area) => {
	const existingAssessmentArea = await db.query(
		`DELETE FROM assessment_areas WHERE project_id = $1 RETURNING *;`,
		[assessment_area.project_id]
	);

	let queryStr = `INSERT INTO assessment_areas (project_id,geom) VALUES %L RETURNING *;`;
	let queryVals = jsToPgFormatAssessmentAreas([assessment_area]);

	const result = await db.query(format(queryStr, queryVals));

	if (result.rows.length === 0) {
		return Promise.reject({ status: 404, msg: 'Not Found' });
	}

	return result.rows[0];
};
