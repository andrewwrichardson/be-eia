const app = require('../app');
const db = require('../db/connection');
const { seed } = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');

const request = require('supertest');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET /api/comments/receptors-comments/:project_id', () => {
	test('200: comments', () => {
		return request(app)
			.get('/api/comments/receptors-comments/1')
			.expect(200)
			.then((result) => {
				console.log(result.body);
			});
	});
});

describe('POST /api/comments', () => {
	test('201: created ', () => {
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

describe('PATCH /api/comments/:comment_id', () => {
	test('201: created - both impact and comment', () => {
		return request(app)
			.patch('/api/comments/1')
			.send({
				updatedComment: {
					impact: 'Major',
					comment: 'yes no yes no',
				},
			})
			.expect(201)
			.then((result) => {
				expect(result.body.comment).toEqual({
					comment_id: 1,
					receptor_id: 1,
					impact: 'Major',
					comment: 'yes no yes no',
				});
			});
	});
	test('201: created - impact', () => {
		return request(app)
			.patch('/api/comments/1')
			.send({
				updatedComment: {
					impact: 'Major',
				},
			})
			.expect(201)
			.then((result) => {
				expect(result.body.comment).toEqual({
					comment_id: 1,
					receptor_id: 1,
					impact: 'Major',
					comment: 'bla bla bla bla bla',
				});
			});
	});
	test('201: created - comment', () => {
		return request(app)
			.patch('/api/comments/1')
			.send({
				updatedComment: {
					comment: 'yes no yes no',
				},
			})
			.expect(201)
			.then((result) => {
				expect(result.body.comment).toEqual({
					comment_id: 1,
					receptor_id: 1,
					impact: 'Moderate',
					comment: 'yes no yes no',
				});
			});
	});
});
