const { postApiData } = require("../models/projects.models");

exports.postApi = (req, res, next) => {
  PostApiData()
    .then((projects) => {
      res.status(200).send({ projects });
    })
    .catch((err) => {
      next(err);
    });
};
