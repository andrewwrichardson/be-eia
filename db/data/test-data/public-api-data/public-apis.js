module.exports = [
    {
        url: 'https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:5000];(node["addr:street"]',
        source: 'Open Steet Map',
        category: 'Community and Private Assets',
        keywords: ['building'],
    },
    {
        url: 'https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:5000];(node["waterway"]',
        source: 'Open Street Map',
        category: 'Water Environment',
        keywords: ['waterway'],
    },
    {
        url: 'https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:5000];(node[“natural”=“water”]',
        source: 'Open Street Map',
        category: 'Water Environment',
        keywords: ['waterbody'],
    },
    {
        url: 'https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:5000];(node["railway"]',
        source: 'Open Street Map',
        category: 'Community and Private Assets',
        keywords: ['railway'],
    },
    {
        url: 'https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:5000];(node["historic"]',
        source: 'Open Street Map',
        category: 'Archaeology / Cultural Heritage',
        keywords: ['historic'],
    },
    {
        url: 'https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:5000];(node["historic"]',
        source: 'Open Street Map',
        category: 'Biodiversity',
        keywords: ['wood'],
    },
    {
        url: 'https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:5000];(node["historic"]',
        source: 'Open Street Map',
        category: 'Biodiversity',
        keywords: ['tree'],
    },
];
