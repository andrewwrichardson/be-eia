const { retrieveOSMRivers } = require(`../models/public-apis.models`);
const db = require("../db/connection");
const { getBbox } = require(`../db/utils/public-api-dataclip.util`);

const callPublicApis = async (req, res, next) => {
  try {
    const project_id = 1; // Fix Me

    const assessmentArea = await db.query(
      `SELECT json_build_object(
                'type', 'FeatureCollection',
                'features', json_agnodeg(json_build_object('type','Feature','properties',json_build_object(),'geometry',ST_AsGeoJSON(assessment_areas.geom)::json)))
                 FROM assessment_areas
                 WHERE project_id = $1;`,
      [project_id]
    );
    const assessmentAreaFC = assessmentArea.rows[0].json_build_object;

    const bbox = getBbox(assessmentAreaFC);

    retrieveOSMRivers(bbox, project_id, assessmentAreaFC);

    //res.status(200).send({ success: "study successful" });
  } catch (err) {
    console.log(err);
  }
};
callPublicApis();
