const {
	fetchProjects,
	addProject,
	updateProject,
} = require('../models/projects.models');

exports.getProjects = (req, res, next) => {
	fetchProjects()
		.then((projects) => {
			res.status(200).send({ projects });
		})
		.catch((err) => {
			next(err);
		});
};

exports.postProject = (req, res, next) => {
	const { project } = req.body;
	addProject(project)
		.then((project) => {
			res.status(201).send({ project });
		})
		.catch((err) => {
			next(err);
		});
};

exports.patchProject = (req, res, next) => {
	const { project_id } = req.params;
	const { project } = req.body;

	updateProject(project_id, project)
		.then((project) => {
			res.status(201).send({ project });
		})
		.catch((err) => {
			next(err);
		});
};
