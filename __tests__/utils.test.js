const {
	jsToPgFormatProjects,
	jsToPgFormatAssessmentAreas,
	jsToPgFormatPublicApis,
	jsToPgFormatReceptors,
	jsToPgFormatComments,
} = require('../db/utils/data-manipulation.utils');

const { geojsonCollectionToPostgis } = require('../db/utils/geojson.utils');

const receptorData = require(`../db/data/test-data/receptors`);

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

describe('jsToPgFormatPublicApis', () => {
	const rawData = [
		{
			url: 'https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:25];(node["addr:street"]',
			source: 'Open Steet Map',
			category: 'Community and Private Assets',
		},
	];
	test('should not mutate', () => {
		jsToPgFormatPublicApis(rawData);
		expect(rawData).toEqual([
			{
				url: 'https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:25];(node["addr:street"]',
				source: 'Open Steet Map',
				category: 'Community and Private Assets',
			},
		]);
	});
	test('should return formated data array', () => {
		expect(jsToPgFormatPublicApis(rawData)).toEqual([
			[
				'https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:25];(node["addr:street"]',
				'Open Steet Map',
				'Community and Private Assets',
			],
		]);
	});
});

describe('jsToPgFormatReceptors', () => {
	const rawData = [...receptorData];
	test('should not mutate', () => {
		jsToPgFormatReceptors(rawData);
		expect(rawData).toEqual([...receptorData]);
	});
	test('should return formated array', () => {
		const result = jsToPgFormatReceptors(rawData);
		result.forEach((item) => {
			expect(item).toEqual([
				expect.any(Number),
				expect.any(Number),
				expect.any(String),
				expect.any(String),
				expect.any(String),
				expect.any(String),
			]);
		});
	});
});

describe('jsToPgFormatComments', () => {
	const rawData = [
		{
			receptor_id: 1,
			impact: 'low',
			comment: 'bla bla bla bla bla',
		},
	];
	test('should not mutate', () => {
		jsToPgFormatComments(rawData);
		expect(rawData).toEqual([
			{
				receptor_id: 1,
				impact: 'low',
				comment: 'bla bla bla bla bla',
			},
		]);
	});
	test('should return formated array', () => {
		expect(jsToPgFormatComments(rawData)).toEqual([
			[1, 'low', 'bla bla bla bla bla'],
		]);
	});
});

describe('geojsonCollectionToPostgis', () => {
	test('should work for a point', () => {
		const point = {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					id: 'node/6815757288',
					properties: {
						'addr:street': 'Howard Street',
						amenity: 'restaurant',
						name: 'Flame',
						id: 'node/6815757288',
					},
					geometry: {
						type: 'Point',
						coordinates: [-5.9334585, 54.5957029],
					},
				},
			],
		};
		expect(geojsonCollectionToPostgis(point)).toEqual([
			[`POINT(-5.9334585 54.5957029)`],
		]);
	});
	test('should work for a linestring', () => {
		const linestring = {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					id: 'way/60611449',
					properties: {
						name: 'Lagan Navigation (abandoned)',
						notes: 'non-navigable',
						source: 'survey',
						waterway: 'canal',
						id: 'way/60611449',
					},
					geometry: {
						type: 'LineString',
						coordinates: [
							[-6.2414445, 54.5104985],
							[-6.2427297, 54.5110303],
						],
					},
				},
			],
		};
		expect(geojsonCollectionToPostgis(linestring)).toEqual([
			[`LINESTRING(-6.2414445 54.5104985,-6.2427297 54.5110303)`],
		]);
	});
	test('should work for a polygon', () => {
		const polygon = {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					id: 'way/45002074',
					properties: {
						'addr:city': 'Belfast',
						'addr:country': 'GB',
						'addr:housename': 'Wellington Buildings',
						'addr:street': 'Wellington Street',
						building: 'yes',
						id: 'way/45002074',
					},
					geometry: {
						type: 'Polygon',
						coordinates: [
							[
								[-5.9320938, 54.5964287],
								[-5.9321077, 54.5965509],
								[-5.9321732, 54.5964257],
								[-5.9320938, 54.5964287],
							],
							[
								[-5.9320938, 54.5964287],
								[-5.9321077, 54.5965509],
								[-5.9326629, 54.5965297],
								[-5.9320938, 54.5964287],
							],
						],
					},
				},
			],
		};
		expect(geojsonCollectionToPostgis(polygon)).toEqual([
			[
				`POLYGON((-5.9320938 54.5964287,-5.9321077 54.5965509,-5.9321732 54.5964257,-5.9320938 54.5964287),(-5.9320938 54.5964287,-5.9321077 54.5965509,-5.9326629 54.5965297,-5.9320938 54.5964287))`,
			],
		]);
	});
});
