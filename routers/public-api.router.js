const express = require("express");

const { callPublicApis } = require("../controllers/public-apis.controllers");

const publicApiRouter = express.Router();

publicApiRouter.route("/:project_id").get(callPublicApis);

module.exports = publicApiRouter;
