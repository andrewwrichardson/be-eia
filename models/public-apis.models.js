const { dataclip } = require("../db/utils/public-api-dataclip.util");

exports.retrieveOSMRivers = async (geojson, project_id) => {
  const result = await dataclip(geojson, project_id);
  return result;
};
