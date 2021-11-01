const {
	jsToPgFormatProjects,
	jsToPgFormatAssessmentAreas,
} = require('../db/utils/data-manipulation');

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

describe('jsToPgFormatAssessmentAreas', () => {
	const rawData = [
		{
			project_id: 1,
			geometry: {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						properties: {},
						geometry: {
							type: 'Polygon',
							coordinates: [
								[
									[26.910678148269653, 46.540399297719794],
									[26.91220164299011, 46.540399297719794],
									[26.91220164299011, 46.54099705451672],
									[26.910678148269653, 46.54099705451672],
									[26.910678148269653, 46.540399297719794],
								],
							],
						},
					},
				],
			},
		},
	];
	test('should not mutate', () => {
		jsToPgFormatAssessmentAreas(rawData);
		expect(rawData).toEqual([
			{
				project_id: 1,
				geometry: {
					type: 'FeatureCollection',
					features: [
						{
							type: 'Feature',
							properties: {},
							geometry: {
								type: 'Polygon',
								coordinates: [
									[
										[26.910678148269653, 46.540399297719794],
										[26.91220164299011, 46.540399297719794],
										[26.91220164299011, 46.54099705451672],
										[26.910678148269653, 46.54099705451672],
										[26.910678148269653, 46.540399297719794],
									],
								],
							},
						},
					],
				},
			},
		]);
	});
	test('should return formated data array', () => {
		expect(jsToPgFormatAssessmentAreas(rawData)).toEqual([
			[
				1,
				{
					type: 'FeatureCollection',
					features: [
						{
							type: 'Feature',
							properties: {},
							geometry: {
								type: 'Polygon',
								coordinates: [
									[
										[26.910678148269653, 46.540399297719794],
										[26.91220164299011, 46.540399297719794],
										[26.91220164299011, 46.54099705451672],
										[26.910678148269653, 46.54099705451672],
										[26.910678148269653, 46.540399297719794],
									],
								],
							},
						},
					],
				},
			],
		]);
	});
});
