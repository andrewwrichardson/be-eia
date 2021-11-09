const {
    dataclip,
    insertReceptorsData,
} = require('../db/utils/public-apis.utils');
let osmtogeojson = require('osmtogeojson');
const db = require('../db/connection');

let axios = require('axios');

//OSM API
const OSMApi = axios.create({
    baseURL: 'https://lz4.overpass-api.de/api',
});

exports.retrieveOSMData = async (bbox, project_id, assessmentAreaFC) => {
    const { minLat, maxLat, minLong, maxLong } = bbox;

    const { data } = await OSMApi.get(
        `/interpreter/?data=[out:json][timeout:5000];(node["historic"](${minLat},${minLong},${maxLat},${maxLong});way["historic"](${minLat},${minLong},${maxLat},${maxLong});node["historic"](${minLat},${minLong},${maxLat},${maxLong});way["waterway"](${minLat},${minLong},${maxLat},${maxLong});node["waterway"](${minLat},${minLong},${maxLat},${maxLong});relation["waterway"](${minLat},${minLong},${maxLat},${maxLong});way["natural"="water"](${minLat},${minLong},${maxLat},${maxLong});node["natural"="water"](${minLat},${minLong},${maxLat},${maxLong});relation["natural"="water"](${minLat},${minLong},${maxLat},${maxLong});way["historic"](${minLat},${minLong},${maxLat},${maxLong});node["historic"](${minLat},${minLong},${maxLat},${maxLong});way["building"](${minLat},${minLong},${maxLat},${maxLong});node["building"](${minLat},${minLong},${maxLat},${maxLong});relation["building"](${minLat},${minLong},${maxLat},${maxLong}););out;>;out skel qt;`
    );

    if (data.elements.length < 1) {
        return Promise.reject({ status: 404, msg: 'No OSM Data Found' });
    }
    const geojsondata = osmtogeojson(data);

    const formattedData = await dataclip(
        geojsondata,
        project_id,
        assessmentAreaFC
    );

    const msg = await insertReceptorsData(formattedData, project_id);

    return msg;
};

exports.fetchPublicApis = async () => {
    let queryStr = `SELECT * FROM public_apis;`;

    const result = await db.query(queryStr);

    if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'Not Found' });
    }

    return result.rows;
};
