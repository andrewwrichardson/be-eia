const {
    retrieveOSMData,
    fetchPublicApis,
} = require(`../models/public-apis.models`);
const db = require('../db/connection');
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

        const msg = await retrieveOSMData(bbox, project_id, assessmentAreaFC);

        res.status(200).send(msg);
    } catch (err) {
        next(err);
    }
};

exports.getPublicApis = (req, res, next) => {
    fetchPublicApis()
        .then((publicApis) => {
            res.status(200).send({ publicApis });
        })
        .catch((err) => {
            next(err);
        });
};
