module.exports = [
  {
    url: `https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:100];(node["building"]`,
    source: "Open Steet Map",
    category: "Community and Private Assets",
  },
  {
    url: `https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:100];(node["waterway"]`,
    source: "Open Street Map",
    category: "Nature Conservation",
  },
  {
    url: `https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:100];(node["natural"="water"]`,
    source: "Open Street Map",
    category: "Nature Conservation",
  },
  {
    url: `https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:100];(node["railway"]`,
    source: "Open Street Map",
    category: "Community and Private Assets",
  },
  {
    url: 'https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:5000];(node["historic"]',
    source: "Open Street Map",
    category: "Cultural Heritage",
  },
];
