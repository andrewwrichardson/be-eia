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
		return [item.project_id, item.api_id, item.geometry];
	});
};

exports.jsToPgFormatComments = (data) => {
	return data.map((item) => {
		return [item.receptor_id, item.impact, item.comment];
	});
};
