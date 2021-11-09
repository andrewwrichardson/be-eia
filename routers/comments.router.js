const express = require('express');
const {
    postComment,
    patchComment,
    getComments,
    getCommentsByReceptor,
} = require('../controllers/comments.controllers');

const commentsRouter = express.Router();

commentsRouter.route('/receptors-comments/:project_id').get(getComments);
commentsRouter.route('/receptor/:receptor_id').get(getCommentsByReceptor);
commentsRouter.route('/:comment_id').patch(patchComment);
commentsRouter.route('/').post(postComment);

module.exports = commentsRouter;
