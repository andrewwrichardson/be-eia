const express = require('express');
const { getApi } = require('../controllers/api.controllers');

const projectsRouter = require('./projects.router');
const assessmentAreasRouter = require('./assessment-areas.router');
const receptorsRouter = require('./receptors.router');

const apiRouter = express.Router();

apiRouter.use('/projects', projectsRouter);
apiRouter.use('/assessment_areas', assessmentAreasRouter);
apiRouter.use('/receptors', receptorsRouter);
apiRouter.route('/').get(getApi);

module.exports = apiRouter;
