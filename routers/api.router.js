const express = require("express");
const { getApi } = require("../controllers/api.controllers");

const publicApiRouter = require(`./public-api.router`);

const apiRouter = express.Router();

apiRouter.use("/public-apis", publicApiRouter);
apiRouter.route("/").get(getApi);

module.exports = apiRouter;
