const turf = require("@turf/turf");
const { jsToPgFormatReceptors } = require(`./data-manipulation.utils`);
const db = require("../connection");
const format = require("pg-format");
fs = require("fs");

exports.dataclip = async (geojson, project_id, api_id, assessmentArea) => {
  let assessmentAreaPolygon = assessmentArea;

  //// format points

  const points = [];
  geojson.features.forEach((feature) => {
    if (feature.geometry.type === "Point") {
      points.push(feature);
    }
  });

  const ptsWithin = turf.pointsWithinPolygon(
    turf.featureCollection(points),
    assessmentAreaPolygon
  );

  const allFeatures = ptsWithin;

  //// find overlapping lines
  const lineString = [];
  geojson.features.forEach((feature) => {
    if (feature.geometry.type === "LineString") {
      lineString.push(feature);
    }
  });

  const splitArr = [];
  lineString.forEach((feature) => {
    assessmentAreaPolygon.features.forEach((assessmentAreaPolygon) => {
      if (turf.booleanWithin(feature, assessmentAreaPolygon)) {
        allFeatures.features.push(feature);
      } else {
        const split = turf.lineSplit(feature, assessmentAreaPolygon);
        split.features.forEach((obj) => {
          obj.properties = feature.properties;
          obj.id = feature.id;
          splitArr.push(obj);
        });
      }
    });
  });

  splitArr.forEach((splitLines) => {
    assessmentAreaPolygon.features.forEach((assessmentAreaPolygon) => {
      let length = turf.length(splitLines);
      let center = turf.along(splitLines, length);
      let overlapping = turf.booleanWithin(center, assessmentAreaPolygon);

      if (overlapping == true) {
        allFeatures.features.push(splitLines);
      }
    });
  });

  //find overlapping polygon
  const polygons = [];
  geojson.features.forEach((feature) => {
    if (feature.geometry.type === "Polygon") {
      polygons.push(feature);
    }
  });

  const polygonsWthn = [];
  polygons.forEach((polygon) => {
    assessmentAreaPolygon.features.forEach((assessmentAreaPolygon) => {
      let intersection = turf.intersect(polygon, assessmentAreaPolygon);

      if (intersection !== null) {
        intersection.type = polygon.type;
        intersection.properties = polygon.properties;
        intersection.id = polygon.id;
        allFeatures.features.push(intersection);
      }
    });
  });

  const receptors = [
    {
      project_id: project_id,
      api_id: api_id,
      geometry: allFeatures,
    },
  ];

  // fs.writeFile(`receptorsV1.json`, JSON.stringify(receptors), function (err) {
  //   if (err) return console.log(err);
  // });

  return receptors;
};

exports.insertReceptorsData = async (receptors, project_id) => {
  await db.query(`DELETE FROM receptors WHERE project_id = $1;`, [project_id]);

  const formattedReceptors = jsToPgFormatReceptors(receptors);
  console.log(formattedReceptors, "formatted receptors");
  queryString = format(
    `INSERT INTO receptors (project_id, api_id, geom, osm_id, type, properties) VALUES %L RETURNING *;`,
    formattedReceptors
  );

  const result = await db.query(queryString);
  // if (result.rows.length > 0) {
  //   return { successful: true };
  // } else {
  //   return Promise.reject({ status: 404, msg: "Not Found" });
  // }
  const log = await db.query(`select* from receptors;`);
  console.log("<------>", log);
};

exports.getBbox = (assessmentArea) => {
  const BboxArr = turf.bbox(assessmentArea);
  const Bbox = {
    minLat: BboxArr[1],
    maxLat: BboxArr[3],
    minLong: BboxArr[0],
    maxLong: BboxArr[2],
  };

  return Bbox;
};
