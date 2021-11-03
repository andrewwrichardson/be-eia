module.exports = [
  {
    url: `https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:100];(node["building"](54.714299482191,-7.382624745369,54.716756737973,-7.3780488967896);way["building"](54.714299482191,-7.382624745369,54.716756737973,-7.3780488967896);relation["building"](54.714299482191,-7.382624745369,54.716756737973,-7.3780488967896););out;>;out skel qt;`,
    source: "Open Steet Map",
    category: "Community and Private Assets",
  },
  {
    url: `https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:100];(node["waterway"](54.58247761244,-5.9683012962341,54.584942850744,-5.9637254476547);way["waterway"](54.58247761244,-5.9683012962341,54.584942850744,-5.9637254476547);relation["waterway"](54.58247761244,-5.9683012962341,54.584942850744,-5.9637254476547););out;>;out skel qt;`,
    source: "Open Street Map",
    category: "Nature Conservation",
  },
  {
    url: `https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:100];(node["natural"="water"](54.581899363448,-5.9250211715698,54.591759561641,-5.9067177772522);way["natural"="water"](54.581899363448,-5.9250211715698,54.591759561641,-5.9067177772522);relation["natural"="water"](54.581899363448,-5.9250211715698,54.591759561641,-5.9067177772522););out;>;out skel qt;`,
    source: "Open Street Map",
    category: "Nature Conservation",
  },
  {
    url: `https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:100];(node["railway"](54.587628640463,-5.9330946207046,54.590093567089,-5.9285187721252);way["railway"](54.587628640463,-5.9330946207046,54.590093567089,-5.9285187721252);relation["railway"](54.587628640463,-5.9330946207046,54.590093567089,-5.9285187721252););out;>;out skel qt;`,
    source: "Open Street Map",
    category: "Community and Private Assets",
  },
];
