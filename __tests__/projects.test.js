const app = require('../app');
const db = require('../db/connection');
const { seed } = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');

// console.log(testData);

const request = require('supertest');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET /api/projects', () => {
	test('200: returns all projects', () => {
		return request(app)
			.get('/api/projects')
			.expect(200)
			.then((result) => {
				result.body.projects.forEach((proj) => {
					expect(proj).toEqual({
						project_id: expect.any(Number),
						project_name: expect.any(String),
					});
				});
			});
	});
});

describe('POST /api/projects', () => {
	test('201: created new project', () => {
		return request(app)
			.post('/api/projects')
			.send({ project: { project_name: 'Project Three' } })
			.expect(201)
			.then((result) => {
				expect(result.body.project).toEqual({
					project_id: 3,
					project_name: 'Project Three',
				});
			});
	});
});