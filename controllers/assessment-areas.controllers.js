const {
	fetchAssessmentArea,
	addAssessmentArea,
} = require('../models/assessment-areas.models');

exports.getAssessmentArea = (req, res, next) => {
	const { project_id } = req.params;
	fetchAssessmentArea(project_id)
		.then((assessment_area) => {
			res.status(200).send({ assessment_area });
		})
		.catch((err) => {
			next(err);
		});
};

exports.postAssessmentArea = (req, res, next) => {
	const { assessment_area } = req.body;

	addAssessmentArea(assessment_area)
		.then((assessment_area) => {
			res.status(201).send({ assessment_area });
		})
		.catch((err) => {
			next(err);
		});
};
