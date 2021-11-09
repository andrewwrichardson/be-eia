const express = require('express');
const {
    getProjects,
    postProject,
    patchProject,
    deleteProject,
} = require('../controllers/projects.controllers');

const projectsRouter = express.Router();

projectsRouter
    .route('/:project_id')
    .get(getProjects)
    .patch(patchProject)
    .delete(deleteProject);
projectsRouter.route('/').get(getProjects).post(postProject);

module.exports = projectsRouter;
