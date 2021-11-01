const format = require('pg-format');
const db = require('../connection');

const seed = (data) => {
	const { assessmentArea, comments, projects, publicApis, receptors } = data;

	return db
		.query(
			'DROP TABLE IF EXISTS assessment_area, comments, projects, public_apis, receptors CASCADE;'
		)
		.then(() => {});
};
