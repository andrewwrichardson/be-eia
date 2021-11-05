const db = require('../db/connection');

exports.fetchReceptors = async (project_id) => {
	let queryStr = `SELECT receptor_id, project_id, api_id, osm_id, type, properties, json_build_object('type', 'FeatureCollection', 'features', json_agg(json_build_object('type','Feature','properties',json_build_object(),'geometry',ST_AsGeoJSON(receptors.geom)::json))) FROM receptors WHERE project_id = $1 GROUP BY receptor_id;`;
	let queryVals = [1];

	const result = await db.query(queryStr, queryVals);

	if (result.rows.length === 0) {
		return Promise.reject({ status: 404, msg: 'Not Found' });
	}

	const updatedReceptors = [];
	result.rows.forEach((receptor) => {
		let updatedReceptor = { ...receptor };
		updatedReceptor.properties = JSON.parse(updatedReceptor.properties);
		delete updatedReceptor.json_build_object;
		updatedReceptor.geometry = { ...receptor.json_build_object };
		updatedReceptors.push(updatedReceptor);
	});

	return updatedReceptors;
};
