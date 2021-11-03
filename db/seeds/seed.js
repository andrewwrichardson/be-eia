const format = require('pg-format');
const db = require('../connection');
const {
	jsToPgFormatProjects,
	jsToPgFormatAssessmentAreas,
	jsToPgFormatPublicApis,
	jsToPgFormatReceptors,
	jsToPgFormatComments,
} = require(`../utils/data-manipulation.utils`);

const seed = async (data) => {
	const { assessmentAreas, comments, projects, publicApis, receptors } = data;

	await db.query(`CREATE EXTENSION IF NOT EXISTS postgis;`);
	await db.query(
		'DROP TABLE IF EXISTS assessment_areas, comments, projects, public_apis, receptors CASCADE;'
	);
	await db.query(`
        CREATE TABLE projects (
        project_id SERIAL PRIMARY KEY NOT NULL,
        project_name VARCHAR(200) NOT NULL
    );
    `);

	const formattedProjects = jsToPgFormatProjects(projects);
	let queryString = format(
		`INSERT INTO projects (project_name) VALUES %L RETURNING *;`,
		formattedProjects
	);
	await db.query(queryString);

	await db.query(`
	    CREATE TABLE assessment_areas (
	    assessment_area_id SERIAL PRIMARY KEY NOT NULL,
	    project_id INT,
	    FOREIGN KEY (project_id) REFERENCES projects(project_id),
	    geom geography
	);
	`);

	const formattedAssessmentAreas = jsToPgFormatAssessmentAreas(assessmentAreas);
	queryString = format(
		`INSERT INTO assessment_areas (project_id,geom) VALUES %L RETURNING *;`,
		formattedAssessmentAreas
	);

	await db.query(queryString);

	await db.query(`
        CREATE TABLE public_apis (
        api_id SERIAL PRIMARY KEY NOT NULL,
        url TEXT NOT NULL,
        source TEXT NOT NULL,
        category TEXT NOT NULL
    );
    `);

	const formattedPublicApis = jsToPgFormatPublicApis(publicApis);
	queryString = format(
		`INSERT INTO public_apis (url, source, category) VALUES %L RETURNING *;`,
		formattedPublicApis
	);
	await db.query(queryString);

	await db.query(`
    CREATE TABLE receptors (
        receptor_id SERIAL PRIMARY KEY NOT NULL,
        project_id INT,
        FOREIGN KEY (project_id) REFERENCES projects(project_id),
        api_id INT,
        FOREIGN KEY (api_id) REFERENCES public_apis(api_id),
        geom geography,
        osm_id TEXT,
        type TEXT,
        properties TEXT  
    );    
    `);

	const formattedReceptors = jsToPgFormatReceptors(receptors);
	queryString = format(
		`INSERT INTO receptors (project_id, api_id, geom,osm_id, type, properties) VALUES %L RETURNING *;`,
		formattedReceptors
	);

	await db.query(queryString);

	await db.query(`
        CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY NOT NULL,
        receptor_id INT,
        FOREIGN KEY (receptor_id) REFERENCES receptors(receptor_id),
        impact TEXT NOT NULL,
        comment TEXT NOT NULL
    );
    `);

	const formattedComments = jsToPgFormatComments(comments);
	queryString = format(
		`INSERT INTO comments (receptor_id, impact, comment) VALUES %L RETURNING *;`,
		formattedComments
	);

	await db.query(queryString);
};

module.exports = { seed };
