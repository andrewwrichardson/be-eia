const express = require('express');
const { getApi } = require('../controllers/api.controllers');

const projectsRouter = require('./projects.router');
const assessmentAreasRouter = require('./assessment-areas.router');

const apiRouter = express.Router();

apiRouter.use('/projects', projectsRouter);
apiRouter.use('/assessment-areas', assessmentAreasRouter);
apiRouter.route('/').get(getApi);

module.exports = apiRouter;
