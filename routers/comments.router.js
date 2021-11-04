const express = require('express');
const { postComment } = require('../controllers/comments.controllers');

const commentsRouter = express.Router();

commentsRouter.route('/').post(postComment);

module.exports = commentsRouter;
