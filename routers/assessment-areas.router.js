const express = require('express');
const {
	getAssessmentArea,
} = require('../controllers/assessment-areas.controllers');

const assessmentAreasRouter = express.Router();

assessmentAreasRouter.route('/:project_id').get(getAssessmentArea);

module.exports = assessmentAreasRouter;
