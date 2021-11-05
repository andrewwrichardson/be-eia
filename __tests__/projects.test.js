const app = require('../app');
const db = require('../db/connection');
const { seed } = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');

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
						image_url: expect.any(String),
					});
				});
			});
	});
});

describe('POST /api/projects', () => {
	test('201: created new project', () => {
		return request(app)
			.post('/api/projects')
			.send({
				project: {
					project_name: 'Project Three',
					image_url: 'https://www.stevensegallery.com/140/100',
				},
			})
			.expect(201)
			.then((result) => {
				expect(result.body.project).toEqual({
					project_id: 3,
					project_name: 'Project Three',
					image_url: 'https://www.stevensegallery.com/140/100',
				});
			});
	});
});

describe('PATCH /api/projects/:project_id', () => {
	test('201: update project - both project_name and image_url', () => {
		return request(app)
			.patch('/api/projects/2')
			.send({
				project: {
					project_name: 'New Project Name',
					image_url: 'https://www.stevensegallery.com/140/100',
				},
			})
			.expect(201)
			.then((result) => {
				expect(result.body.project).toEqual({
					project_id: 2,
					project_name: 'New Project Name',
					image_url: 'https://www.stevensegallery.com/140/100',
				});
			});
	});
	test('201: update project - project_name', () => {
		return request(app)
			.patch('/api/projects/2')
			.send({
				project: {
					project_name: 'New Project Name',
				},
			})
			.expect(201)
			.then((result) => {
				expect(result.body.project).toEqual({
					project_id: 2,
					project_name: 'New Project Name',
					image_url: 'https://www.stevensegallery.com/140/100',
				});
			});
	});
	test('201: update project - image_url', () => {
		return request(app)
			.patch('/api/projects/2')
			.send({
				project: {
					image_url: 'https://www.stevensegallery.com/140/100',
				},
			})
			.expect(201)
			.then((result) => {
				expect(result.body.project).toEqual({
					project_id: 2,
					project_name: 'Project Two',
					image_url: 'https://www.stevensegallery.com/140/100',
				});
			});
	});
});
