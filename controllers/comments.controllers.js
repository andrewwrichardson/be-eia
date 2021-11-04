const { addComment, editComment } = require('../models/comments.models');

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
