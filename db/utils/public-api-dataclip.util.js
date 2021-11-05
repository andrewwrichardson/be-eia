const turf = require("@turf/turf");

const receptorData = require(`../data/test-data/receptors`);
const db = require("../connection");

exports.dataclip = async (geojson, project_id) => {
  //console.log(project_id);
  //console.log("geojson--->", geojson);

  const publicApis = await db.query(`SELECT * FROM public_apis;`);
  //console.log("publicAPI--->", publicApis);
  const assessmentArea = await db.query(
    `SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(json_build_object('type','Feature','properties',json_build_object(),'geometry',ST_AsGeoJSON(assessment_areas.geom)::json)))
         FROM assessment_areas
         WHERE project_id = $1;`,
    [project_id]
  );
  //   console.log(
  //     assessmentArea.rows[0].json_build_object.features,
  //     "assessment area"
  //   );
  let polygon = assessmentArea.rows[0].json_build_object;
  //clip points

  //   //// format points
  const points = [];
  geojson.features.forEach((feature) => {
    if (feature.geometry.type === "Point") {
      points.push(feature);
    }
  });

  const ptsWithin = turf.pointsWithinPolygon(
    turf.featureCollection(points),
    polygon
  );

  //// format lines
  const lineString = [];
  geojson.features.forEach((feature) => {
    if (feature.geometry.type === "LineString") {
      lineString.push(feature);
    }
  });
  //   console.log(lineString[0].geometry.coordinates, "----<");
  //   // determine intersection points
  //   let intersects = turf.lineIntersect(
  //     turf.featureCollection(lineString),
  //     polygon
  //   );
  //   console.log(intersects.features[0].geometry, "---->intersects");

  //split line feature

  const splitArr = [];
  lineString.forEach((feature) => {
    polygon.features.forEach((polygon) => {
      const split = turf.lineSplit(feature, polygon);
      console.log(split, "split");
      split.features.forEach((obj) => {
        obj.properties = feature.properties;
        splitArr.push(obj);
      });
    });
  });
  console.log(splitArr, "<<<<");

  //find overlapping polygon
  const overlappingArr = [];
  splitArr.forEach((splitLines) => {
    polygon.features.forEach((polygon) => {
      let overlapping = turf.lineOverlap(polygon, splitLines);
      console.log(polygon, "polygon");
      console.log(splitLines, "splitlines");
      console.log(overlapping);
      overlappingArr.push(overlapping);
    });
  });
  console.log(overlappingArr, "overlappingArr");
  return assessmentArea;

  //dataclip(receptorData, 1);

  //  //// format points
  //  const points = [];
  //  geojson.features.forEach((feature) => {
  //    if (feature.geometry.type === "Point") {
  //      points.push(feature.geometry.coordinates);
  //    }
  //  });
  //  console.log(points);

  //  ////format polygon
  //  const polygon = [];
  //  assessmentArea.rows[0].json_build_object.features.forEach((feature) => {
  //    feature.geometry.coordinates.forEach((location) => {
  //      polygon.push(location);
  //    });
  //  });

  //  console.log(polygon, " ---> polygon");

  //  const ptsWithin = turf.pointsWithinPolygon(
  //    turf.points(points,),
  //    turf.polygon(polygon)
  //  );
  //  console.log(ptsWithin.features[0].geometry, "within")
};
