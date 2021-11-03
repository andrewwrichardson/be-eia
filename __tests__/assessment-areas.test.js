const app = require('../app');
const db = require('../db/connection');
const { seed } = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');

const request = require('supertest');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET /api/assessment-areas/:project_id', () => {
	test('200: returns all assessment areas', () => {
		return request(app)
			.get('/api/assessment-areas/1')
			.expect(200)
			.then((result) => {
				expect(result.body).toEqual({
					assessment_area: expect.any(Object),
				});
			});
	});
});

// describe('POST /api/assessment-areas', () => {
// 	test('201: created new project', () => {
// 		return request(app)
// 			.post('/api/assessment-areas')
// 			.send({
// 				assessment_area: { project_id: 1, geom: 'Project Three' },
// 			})
// 			.expect(201)
// 			.then((result) => {
// 				expect(result.body.project).toEqual();
// 			});
// 	});
// });

// describe('PATCH /api/assessment-areas', () => {
// 	test('201: created new project', () => {
// 		return request(app)
// 			.patch('/api/assessment-areas/1')
// 			.send({ project: { geom: 'Project Three' } })
// 			.expect(201)
// 			.then((result) => {
// 				expect(result.body.project).toEqual();
// 			});
// 	});
// });
