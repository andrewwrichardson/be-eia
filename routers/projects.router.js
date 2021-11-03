const express = require('express');
const { getProjects } = require('../controllers/projects.controllers');

const projectsRouter = express.Router();

projectsRouter.route('/').get(getProjects);

module.exports = projectsRouter;
