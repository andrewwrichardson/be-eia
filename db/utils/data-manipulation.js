exports.jsToPgFormatProjects = (data) => {
	return data.map((item) => {
		return [item.project_name];
	});
};
