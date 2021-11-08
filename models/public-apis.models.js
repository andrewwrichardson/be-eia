const {
  dataclip,
  insertReceptorsData,
} = require("../db/utils/public-apis.utils");

let osmtogeojson = require("osmtogeojson");

let axios = require("axios");

//OSM API
const OSMApi = axios.create({
  baseURL: "https://lz4.overpass-api.de/api",
});

exports.retrieveOSMRivers = async (bbox, project_id, assessmentAreaFC) => {
  const { minLat, maxLat, minLong, maxLong } = bbox;
  const api_id = 2;

  const { data } = await OSMApi.get(
    `/interpreter/?data=[out:json][timeout:10000];(node["waterway"](${minLat},${minLong},${maxLat},${maxLong});way["waterway"](${minLat},${minLong},${maxLat},${maxLong});relation["waterway"](${minLat},${minLong},${maxLat},${maxLong}););out;>;out skel qt;`
  );

  if (data.elements.length < 1) {
    return Promise.reject({ status: 404, msg: "No OSM Data Found" });
  }
  const geojsondata = osmtogeojson(data);

  const formattedData = await dataclip(
    geojsondata,
    project_id,
    api_id,
    assessmentAreaFC
  );

  const msg = await insertReceptorsData(formattedData, project_id, api_id);

  return msg;
};

exports.retrieveOSMWaterBody = async (bbox, project_id, assessmentAreaFC) => {
  const { minLat, maxLat, minLong, maxLong } = bbox;
  const api_id = 2;

  const { data } = await OSMApi.get(
    `/interpreter/?data=[out:json][timeout:10000];(node["natural"="water"](${minLat},${minLong},${maxLat},${maxLong});way["natural"="water"](${minLat},${minLong},${maxLat},${maxLong});relation["natural"="water"](${minLat},${minLong},${maxLat},${maxLong}););out;>;out skel qt;`
  );

  if (data.elements.length < 1) {
    return Promise.reject({ status: 404, msg: "No OSM Data Found" });
  }
  const geojsondata = osmtogeojson(data);

  const formattedData = await dataclip(
    geojsondata,
    project_id,
    api_id,
    assessmentAreaFC
  );

  const msg = await insertReceptorsData(formattedData, project_id, api_id);

  return msg;
};

exports.retrieveOSMHistoricMono = async (
  bbox,
  project_id,
  assessmentAreaFC
) => {
  const { minLat, maxLat, minLong, maxLong } = bbox;
  const api_id = 5;

  const { data } = await OSMApi.get(
    `/interpreter/?data=[out:json][timeout:10000];(node["historic"](${minLat},${minLong},${maxLat},${maxLong});way["historic"](${minLat},${minLong},${maxLat},${maxLong}););out;>;out skel qt;`
  );

  if (data.elements.length < 1) {
    return Promise.reject({ status: 404, msg: "No OSM Data Found" });
  }
  const geojsondata = osmtogeojson(data);

  const formattedData = await dataclip(
    geojsondata,
    project_id,
    api_id,
    assessmentAreaFC
  );

  const msg = await insertReceptorsData(formattedData, project_id, api_id);

  return msg;
};

exports.retrieveOSMBuildings = async (bbox, project_id, assessmentAreaFC) => {
  const { minLat, maxLat, minLong, maxLong } = bbox;
  const api_id = 1;

  const { data } = await OSMApi.get(
    `/interpreter/?data=[out:json][timeout:10000];(node["building"](${minLat},${minLong},${maxLat},${maxLong});way["building"](${minLat},${minLong},${maxLat},${maxLong});relation["building"](${minLat},${minLong},${maxLat},${maxLong}););out;>;out skel qt;`
  );
  ("building");
  if (data.elements.length < 1) {
    return Promise.reject({ status: 404, msg: "No OSM Data Found" });
  }
  const geojsondata = osmtogeojson(data);

  const formattedData = await dataclip(
    geojsondata,
    project_id,
    api_id,
    assessmentAreaFC
  );

  const msg = await insertReceptorsData(formattedData, project_id, api_id);

  return msg;
};
