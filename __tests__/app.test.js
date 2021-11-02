const request = require('supertest');
const app = require('../app');

describe('GET /api', () => {
	test('200: list of endpoints', () => {
		return request(app)
			.get('/api')
			.expect(200)
			.then((res) => {
				expect(res.body).toEqual({ endpoints: expect.any(Object) });
			});
	});
});
