const {
    addComment,
    editComment,
    fetchComments,
    fetchCommentsByReceptor,
} = require('../models/comments.models');

exports.getComments = (req, res, next) => {
    const { project_id } = req.params;
    fetchComments(project_id)
        .then((comments) => [res.status(200).send({ comments })])
        .catch((err) => {
            next(err);
        });
};

exports.getCommentsByReceptor = (req, res, next) => {
    const { receptor_id } = req.params;
    fetchCommentsByReceptor(receptor_id)
        .then((comments) => {
            res.status(200).send({ comments });
        })
        .catch((err) => {
            next(err);
        });
};

exports.postComment = (req, res, next) => {
    const { newComment } = req.body;
    addComment(newComment)
        .then((comment) => {
            res.status(201).send({ comment });
        })
        .catch((err) => {
            next(err);
        });
};

exports.patchComment = (req, res, next) => {
    const { updatedComment } = req.body;
    const { comment_id } = req.params;
    editComment(comment_id, updatedComment)
        .then((comment) => res.status(201).send({ comment }))
        .catch((err) => {
            next(err);
        });
};
