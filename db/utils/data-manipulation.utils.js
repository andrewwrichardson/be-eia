const { geojsonCollectionToPostgis } = require(`./geojson.utils`);

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
	var returnArr = [];
	data.forEach((item) => {
		const postGISData = geojsonCollectionToPostgis(item.geometry);
		item.geometry.features.forEach((feat, index) => {
			returnArr.push([
				item.project_id,
				item.api_id,
				postGISData[index][0],
				feat.id,
				feat.geometry.type,
				JSON.stringify(feat.properties),
			]);
		});
	});
	return returnArr;
};

exports.jsToPgFormatComments = (data) => {
	return data.map((item) => {
		return [item.receptor_id, item.impact, item.comment];
	});
};
