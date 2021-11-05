const { dataclip } = require("../db/utils/public-api-dataclip.util");
let osmtogeojson = require("osmtogeojson");
const turf = require("@turf/turf");
let axios = require("axios");
const db = require("../db/connection");
//OSM API
const OSMApi = axios.create({
  baseURL: "https://lz4.overpass-api.de/api",
});

const retrieveOSMRivers = async (project_id) => {
  const publicApis = await db.query(`SELECT * FROM public_apis;`);

  const assessmentArea = await db.query(
    `SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(json_build_object('type','Feature','properties',json_build_object(),'geometry',ST_AsGeoJSON(assessment_areas.geom)::json)))
         FROM assessment_areas
         WHERE project_id = $1;`,
    [project_id]
  );

  let assessmentAreaPolygon =
    assessmentArea.rows[0].json_build_object.features[0].geometry.coordinates;
  console.log(assessmentAreaPolygon, "aa");
  let boundingBox = turf.bboxPolygon(assessmentAreaPolygon);
  console.log(boundingBox, "bb");

  // const { data } = await OSMApi.get(
  //   `https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:100];(node["waterway"](54.58247761244,-5.9683012962341,54.584942850744,-5.9637254476547);way["waterway"](54.58247761244,-5.9683012962341,54.584942850744,-5.9637254476547);relation["waterway"](54.58247761244,-5.9683012962341,54.584942850744,-5.9637254476547););out;>;out skel qt;`
  // );

  // const result = await dataclip(d∂ata, project_id);
  // const convertedData = osmtogeojson(result);

  // return result;
};
retrieveOSMRivers(1);
