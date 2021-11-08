exports.handlePSQL400Error = (err, req, res, next) => {
  if (err.code === "22P02") {
    console.log(err.code, "code 22P02");
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
};

exports.handlesCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handle500Errors = (err, req, res, next) => {
  res.status(500).send(500).send({ msg: "Internal server error" });
};
