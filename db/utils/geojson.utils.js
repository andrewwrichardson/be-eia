exports.geojsonCollectionToPostgis = (geojson) => {
  return geojson.features.map((feat) => {
    if (feat.geometry.type === "Point") {
      return [
        `${feat.geometry.type}`,
        `${feat.geometry.type}(${feat.geometry.coordinates[0]} ${feat.geometry.coordinates[1]})`,
      ];
    } else if (feat.geometry.type === "LineString") {
      return [
        `${feat.geometry.type}`,
        `${feat.geometry.type}(${feat.geometry.coordinates[0][0]} ${feat.geometry.coordinates[0][1]}, ${feat.geometry.coordinates[1][0]} ${feat.geometry.coordinates[1][1]})`,
      ];
    } else if (feat.geometry.type === "Polygon") {
      var tempStr = ``;
      return [
        `${feat.geometry.type}`,
        `${feat.geometry.type}(${feat.geometry.coordinates[0][0][0]} ${feat.geometry.coordinates[0][0][1]}, ${feat.geometry.coordinates[0][1][0]} ${feat.geometry.coordinates[0][1][1]})`,
      ];
    }
  });
};
