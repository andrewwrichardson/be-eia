const db = require("../db/connection");
const osmtogeojson = require("osmtogeojson");
const axios = require("axios");

const postApiData = async (project_id) => {
  console.log(project_id);
  try {
    // retrieve public api from server
    // retrieve polygon from server

    let [publicApis, assessmentArea] = await Promise.all([
      db.query(`SELECT * FROM public_apis;`),
      db.query(`SELECT * FROM assessment_areas WHERE project_id=$1;`, [
        project_id,
      ]),
    ]);
    // const url = publicApis.rows.map((source) => {
    //   return source.url;
    // });
    //console.log(url);
    //call each public api
    await Promise.all(
      publicApis.rows.map(async (source) => {
        const res = await axios.get(`${source.url}`);
        const convertedData = osmtogeojson(res.data);
        console.log(res.status);
      })
    );

    // complete spatial query  & return data to table
    // https://postgis.net/docs/ST_Intersection.html
    //https://gis.stackexchange.com/questions/321485/spatial-query-with-clip-postgis

    //write to receptors
  } catch (err) {
    console.dir(err);
  }
};
module.exports = postApiData;

postApiData(1);
