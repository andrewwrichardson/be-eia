const { fetchReceptors } = require('../models/receptors.models');

exports.getReceptors = (req, res, next) => {
	const { project_id } = req.params;
	fetchReceptors(project_id)
		.then((receptors) => {
			res.status(200).send({ receptors });
		})
		.catch((err) => {
			next(err);
		});
};
