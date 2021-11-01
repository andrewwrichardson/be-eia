const format = require('pg-format');
const db = require('../connection');

const seed = async (data) => {
	const { assessmentAreas, comments, projects, publicApis, receptors } = data;

	await db.query(`CREATE EXTENSION postgis;`);
	await db.query(
		'DROP TABLE IF EXISTS assessment_areas, comments, projects, public_apis, receptors CASCADE;'
	);
	await db.query(`
        CREATE TABLE projects (
        project_id SERIAL PRIMARY KEY NOT NULL,
        project_name VARCHAR(200) NOT NULL
    );
    `);
	await db.query(`
	    CREATE TABLE assessment_areas (
	    assessment_area_id SERIAL PRIMARY KEY NOT NULL,
	    project_id INT,
	    FOREIGN KEY (project_id) REFERENCES projects(project_id),
	    geom geography
	);
	`);
	await db.query(`
        CREATE TABLE public_apis (
        api_id SERIAL PRIMARY KEY NOT NULL,
        url TEXT NOT NULL,
        source TEXT NOT NULL,
        category TEXT NOT NULL
    );
    `);
	await db.query(`
    CREATE TABLE receptors (
        receptor_id SERIAL PRIMARY KEY NOT NULL,
        project_id INT,
        FOREIGN KEY (project_id) REFERENCES projects(project_id),
        api_id INT,
        FOREIGN KEY (api_id) REFERENCES public_apis(api_id),
        geom geography
    );    
    `);
	await db.query(`
        CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY NOT NULL,
        receptor_id INT,
        FOREIGN KEY (receptor_id) REFERENCES receptors(receptor_id),
        impact TEXT NOT NULL,
        comment TEXT NOT NULL
    );
    `);
};

module.exports = { seed };
