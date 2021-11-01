const { jsToPgFormatProjects } = require('../db/utils/data-manipulation');

describe('jsToPgFormatProjects', () => {
	const rawData = [
		{
			project_name: 'Project One',
		},
	];
	test('should not mutate', () => {
		jsToPgFormatProjects(rawData);
		expect(rawData).toEqual([
			{
				project_name: 'Project One',
			},
		]);
	});
	test('should return formated data array', () => {
		expect(jsToPgFormatProjects(rawData)).toEqual([['Project One']]);
	});
});
