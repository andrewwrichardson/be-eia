const app = require('../app');
const db = require('../db/connection');
const { seed } = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');

const request = require('supertest');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET /api/receptors:project_id', () => {
	test('200: retrieve all receptors for project_id', () => {
		return request(app)
			.get('/api/receptors/1')
			.expect(200)
			.then((result) => {
				// console.log('receptors test ----> \n', result.body);
			});
	});
});
