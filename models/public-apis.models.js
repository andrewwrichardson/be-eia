const {
  dataclip,
  insertReceptorsData,
} = require("../db/utils/public-api-dataclip.util");

let osmtogeojson = require("osmtogeojson");

let axios = require("axios");

//OSM API
const OSMApi = axios.create({
  baseURL: "https://lz4.overpass-api.de/api",
});

exports.retrieveOSMRivers = async (bbox, project_id, assessmentAreaFC) => {
  const { minLat, maxLat, minLong, maxLong } = bbox;
  console.log("before api call");
  const { OSMdata } = await OSMApi.get(
    `https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:100];(node["waterway"](${minLat},${minLong},${maxLat},${maxLong});way["waterway"](${minLat},${minLong},${maxLat},${maxLong});relation["waterway"](${minLat},${minLong},${maxLat},${maxLong}););out;>;out skel qt;`
  );
  const geojsondata = osmtogeojson(OSMdata);
  console.log("before dataclip");
  const formattedData = await dataclip(
    geojsondata,
    project_id,
    assessmentAreaFC
  );

  insertReceptorsData(formattedData);
};
