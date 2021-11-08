const endpoints = require("../endpoints.json");

exports.callPublicApi = (req, res, next) => {
  res
    .status(200)
    .send({ endpoints })
    .catch((err) => next(err));
};
