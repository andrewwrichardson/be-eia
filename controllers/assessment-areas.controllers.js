const { fetchAssessmentArea } = require('../models/assessment-areas.models');

exports.getAssessmentArea = (req, res, next) => {
	const { project_id } = req.params;
	fetchAssessmentArea(project_id)
		.then((assessment_area) => {
			// console.log('controller a_a ---->', { assessment_area });
			res.status(200).send({ assessment_area });
		})
		.catch((err) => {
			next(err);
		});
};
