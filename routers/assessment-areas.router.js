const express = require('express');
const {
	getAssessmentArea,
	postAssessmentArea,
} = require('../controllers/assessment-areas.controllers');

const assessmentAreasRouter = express.Router();

assessmentAreasRouter.route('/').post(postAssessmentArea);
assessmentAreasRouter.route('/:project_id').get(getAssessmentArea);

module.exports = assessmentAreasRouter;
