const express = require('express');
const { getApi } = require('../controllers/api.controllers');

const projectsRouter = require('./projects.router');

const apiRouter = express.Router();

apiRouter.use('/projects', projectsRouter);
apiRouter.route('/').get(getApi);

module.exports = apiRouter;
