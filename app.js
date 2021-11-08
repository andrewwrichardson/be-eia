const express = require("express");
const cors = require("cors");

const {
  handlePSQL400Error,
  handlesCustomErrors,
  handle500Errors,
} = require("./errors/errors");

const apiRouter = require("./routers/api.router");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

app.use(handlePSQL400Error);
app.use(handlesCustomErrors);
app.use(handle500Errors);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Invalid URL" });
});

module.exports = app;
