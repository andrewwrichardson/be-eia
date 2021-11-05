const { dataclip } = require("../db/utils/public-api-dataclip.util");
let osmtogeojson = require("osmtogeojson");

//OSM API
const OSMApi = axios.create({
  baseURL: "https://lz4.overpass-api.de/api",
});

exports.retrieveOSMRivers = async (
  project_id,
  minLat,
  maxLat,
  minLong,
  maxLat
) => {
  const { data } = await OSMApi.get(
    `https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:100];(node["waterway"](54.58247761244,-5.9683012962341,54.584942850744,-5.9637254476547);way["waterway"](54.58247761244,-5.9683012962341,54.584942850744,-5.9637254476547);relation["waterway"](54.58247761244,-5.9683012962341,54.584942850744,-5.9637254476547););out;>;out skel qt;`
  );

  const result = await dataclip(data, project_id);
  const convertedData = osmtogeojson(result);

  return result;
};
