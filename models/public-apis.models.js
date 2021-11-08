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
  const api_id = 2;

  const res = await OSMApi.get(
    `/interpreter/?data=[out:json][timeout:1000];(node["waterway"](${minLat},${minLong},${maxLat},${maxLong});way["waterway"](${minLat},${minLong},${maxLat},${maxLong});relation["waterway"](${minLat},${minLong},${maxLat},${maxLong}););out;>;out skel qt;`
  );
  // console.log(res.Error, "<<<<<<<<<<");
  // if (res.status !== 200) {
  //   return Promise.reject({ status: res.status, msg: res.Error });
  // }

  const geojsondata = osmtogeojson(res.data);

  const formattedData = await dataclip(
    geojsondata,
    project_id,
    api_id,
    assessmentAreaFC
  );

  return insertReceptorsData(formattedData, project_id);
};
