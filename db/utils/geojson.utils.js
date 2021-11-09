exports.geojsonCollectionToPostgis = (geojson) => {
  return geojson.features.map((feat) => {
    if (feat.geometry.type === "Point") {
      return [
        `POINT(${feat.geometry.coordinates[0]} ${feat.geometry.coordinates[1]})`,
      ];
    } else if (feat.geometry.type === "LineString") {
      var tempStr = `LINESTRING(`;
      feat.geometry.coordinates.forEach((point) => {
        tempStr += `${point[0]} ${point[1]},`;
      });
      tempStr = tempStr.slice(0, -1);
      tempStr += `)`;
      return [tempStr];
    } else if (feat.geometry.type === "Polygon") {
      var tempStr = `POLYGON(`;
      feat.geometry.coordinates.forEach((polygon) => {
        var polStr = `(`;
        polygon.forEach((point) => {
          polStr += `${point[0]} ${point[1]},`;
        });
        polStr = polStr.slice(0, -1);
        polStr += `),`;
        tempStr += polStr;
      });
      tempStr = tempStr.slice(0, -1);
      tempStr += `)`;
      return [tempStr];
    }
  });
};
