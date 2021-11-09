const turf = require("@turf/turf");
const { jsToPgFormatReceptors } = require(`./data-manipulation.utils`);
const db = require("../connection");
const format = require("pg-format");
const publicApiRouter = require("../../routers/public-api.router");
fs = require("fs");

exports.dataclip = async (geojson, project_id, assessmentArea) => {
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

  let receptors = await addApiId(project_id, allFeatures);

  return receptors;
};

const addApiId = async (project_id, allFeatures) => {
  const receptors = [];

  const public_apis = await db.query(`SELECT * FROM public_apis;`);

  allFeatures.features.forEach((feature) => {
    Object.keys(feature.properties).forEach((key) => {
      public_apis.rows.forEach((api, index) => {
        if (key.includes(api.keywords)) {
          receptors.push({
            project_id: project_id,
            api_id: public_apis.rows[index].api_id,
            geometry: turf.featureCollection([feature]),
          });
        }
      });
    });
  });
  return receptors;
};

exports.insertReceptorsData = async (receptors, project_id) => {
  await db.query(`DELETE FROM receptors WHERE project_id = $1;`, [project_id]);

  const formattedReceptors = jsToPgFormatReceptors(receptors);

  queryString = format(
    `INSERT INTO receptors (project_id, api_id, geom, osm_id, type, properties) VALUES %L RETURNING *;`,
    formattedReceptors
  );

  const result = await db.query(queryString);

  if (result.rows.length > 0) {
    return {
      msg: `OK`,
    };
  }
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
