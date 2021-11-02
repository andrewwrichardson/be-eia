exports.jsToPgFormatProjects = (data) => {
  return data.map((item) => {
    return [item.project_name];
  });
};

exports.jsToPgFormatAssessmentAreas = (data) => {
  return data.map((item) => {
    return [item.project_id, item.geometry];
  });
};

exports.jsToPgFormatPublicApis = (data) => {
  return data.map((item) => {
    return [item.url, item.source, item.category];
  });
};

exports.jsToPgFormatReceptors = (data) => {
  return data.map((item) => {
    item.geometry.map((feat) => {
      return [
        item.project_id,
        item.api_id,
        ,
        feat.id,
        feat.geometry.type,
        JSON.stringify(feat.properties),
      ];
    });
  });
};

exports.jsToPgFormatComments = (data) => {
  return data.map((item) => {
    return [item.receptor_id, item.impact, item.comment];
  });
};
