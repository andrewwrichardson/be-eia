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
        project_name VARCHAR(200) NOT NULL,
		image_url TEXT
    );
    `);

    const formattedProjects = jsToPgFormatProjects(projects);
    let queryString = format(
        `INSERT INTO projects (project_name, image_url) VALUES %L RETURNING *;`,
        formattedProjects
    );
    await db.query(queryString);

    await db.query(`
	    CREATE TABLE assessment_areas (
	    assessment_area_id SERIAL PRIMARY KEY NOT NULL,
	    geom geography,
	    project_id INT,
		CONSTRAINT project_id
	    FOREIGN KEY (project_id) REFERENCES projects(project_id)
		ON DELETE CASCADE
	);
	`);

    const formattedAssessmentAreas =
        jsToPgFormatAssessmentAreas(assessmentAreas);
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
        category TEXT NOT NULL,
        keywords TEXT NOT NULL 
    );
    `);

    const formattedPublicApis = jsToPgFormatPublicApis(publicApis);
    queryString = format(
        `INSERT INTO public_apis (url, source, category, keywords) VALUES %L RETURNING *;`,
        formattedPublicApis
    );
    await db.query(queryString);

    await db.query(`
    CREATE TABLE receptors (
        receptor_id SERIAL PRIMARY KEY NOT NULL,
        api_id INT,
        FOREIGN KEY (api_id) REFERENCES public_apis(api_id),
        geom geography,
        osm_id TEXT,
        type TEXT,
        properties TEXT,
        project_id INT,
		CONSTRAINT project_id
		FOREIGN KEY (project_id) REFERENCES projects(project_id)
		ON DELETE CASCADE
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
        impact TEXT NOT NULL,
        comment TEXT NOT NULL,
        receptor_id INT,
		CONSTRAINT receptor_id
		FOREIGN KEY (receptor_id) REFERENCES receptors(receptor_id)
		ON DELETE CASCADE
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
