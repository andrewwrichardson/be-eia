const osmInput = require(`./osm-input.json`);

module.exports = [
  {
    project_id: 1,
    api_id: 1,
    geometry: osmInput,
  },
  {
    project_id: 1,
    api_id: 3,
    geometry: osmInput,
  },
  {
    project_id: 2,
    api_id: 2,
    geometry: osmInput,
  },
];
