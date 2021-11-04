const app = require('../app');
const db = require('../db/connection');
const { seed } = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');

const request = require('supertest');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('POST /api/comments', () => {
	test('210: created ', () => {
		return request(app)
			.post('/api/comments')
			.send({
				newComment: {
					receptor_id: 1,
					impact: 'Minor',
					comment: 'yes no yes no',
				},
			})
			.expect(201)
			.then((result) => {
				expect(result.body.comment).toEqual({
					comment_id: 3,
					receptor_id: 1,
					impact: 'Minor',
					comment: 'yes no yes no',
				});
			});
	});
});
