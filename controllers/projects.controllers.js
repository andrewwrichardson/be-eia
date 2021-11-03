const { fetchProjects } = require('../models/projects.models');

exports.getProjects = (req, res, next) => {
	fetchProjects()
		.then((projects) => {
			res.status(200).send({ projects });
		})
		.catch((err) => {
			next(err);
		});
};
