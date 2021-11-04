const express = require('express');
const {
	postComment,
	patchComment,
} = require('../controllers/comments.controllers');

const commentsRouter = express.Router();

commentsRouter.route('/:comment_id').patch(patchComment);
commentsRouter.route('/').post(postComment);

module.exports = commentsRouter;
