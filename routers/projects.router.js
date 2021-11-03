const express = require('express');
const {
	getProjects,
	postProject,
} = require('../controllers/projects.controllers');

const projectsRouter = express.Router();

projectsRouter.route('/').get(getProjects).post(postProject);

module.exports = projectsRouter;
