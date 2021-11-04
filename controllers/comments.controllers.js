const { addComment } = require('../models/comments.models');

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
