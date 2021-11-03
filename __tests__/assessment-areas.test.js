const app = require('../app');
const db = require('../db/connection');
const { seed } = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');

const request = require('supertest');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET /api/assessment_areas/:project_id', () => {
	test('200: returns all assessment areas', () => {
		return request(app)
			.get('/api/assessment_areas/1')
			.expect(200)
			.then((result) => {
				expect(result.body).toEqual({
					assessment_area: expect.any(Object),
				});
			});
	});
});

describe('POST /api/assessment_areas', () => {
	test('201: created new assessment area', () => {
		return request(app)
			.post('/api/assessment_areas')
			.send({
				assessment_area: {
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
			})
			.expect(201)
			.then((result) => {
				expect(result.body.assessment_area).toEqual({
					assessment_area_id: 4,
					project_id: 1,
					geom: expect.any(String),
				});
			});
	});
});
