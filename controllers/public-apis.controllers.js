const {
  retrieveOSMRivers,
  retrieveOSMWaterBody,
  retrieveOSMHistoricMono,
  retrieveOSMBuildings,
} = require(`../models/public-apis.models`);
const db = require("../db/connection");
const { getBbox } = require(`../db/utils/public-apis.utils`);

exports.callPublicApis = async (req, res, next) => {
  try {
    const { project_id } = req.params;

    const assessmentArea = await db.query(
      `SELECT json_build_object(
                'type', 'FeatureCollection',
                'features', json_agg(json_build_object('type','Feature','properties',json_build_object(),'geometry',ST_AsGeoJSON(assessment_areas.geom)::json)))
                 FROM assessment_areas
                 WHERE project_id = $1;`,
      [project_id]
    );
    const assessmentAreaFC = assessmentArea.rows[0].json_build_object;

    const bbox = getBbox(assessmentAreaFC);

    const msg = await Promise.allSettled([
      retrieveOSMRivers(bbox, project_id, assessmentAreaFC),
      retrieveOSMWaterBody(bbox, project_id, assessmentAreaFC),
      retrieveOSMHistoricMono(bbox, project_id, assessmentAreaFC),
      retrieveOSMBuildings(bbox, project_id, assessmentAreaFC),
    ]);

    const bool = msg.every((apiCall) => {
      apiCall.status === "fullfilled";
    });
    console.log(msg, typeof bool);

    failedArr = [];
    if (bool === true) {
      res
        .status(200)
        .send({ status: 200, msg: "All api data retrieved successfully" });
    } else {
      msg.forEach((outcome) => {
        if (outcome.status === "rejected") {
          failedArr.push(outcome.api_id);
        }
      });
      res.status(200).send({
        status: 206,
        msg: `Could not retrieve data from the following Api(s) ${failedArr}`,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
