const express = require('express');
const { getReceptors } = require('../controllers/receptors.controllers');

const receptorsRouter = express.Router();

receptorsRouter.route('/:project_id').get(getReceptors);

module.exports = receptorsRouter;
