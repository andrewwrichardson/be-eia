const express = require('express');

const {
    callPublicApis,
    getPublicApis,
} = require('../controllers/public-apis.controllers');

const publicApiRouter = express.Router();

publicApiRouter.route('/:project_id').get(callPublicApis);
publicApiRouter.route('/').get(getPublicApis);

module.exports = publicApiRouter;
