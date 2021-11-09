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
                result.body.comments.forEach((comm) => {
                    expect(comm).toEqual({
                        receptor_id: expect.any(Number),
                        project_id: expect.any(Number),
                        api_id: expect.any(Number),
                        osm_id: expect.any(String),
                        type: expect.any(String),
                        properties: expect.any(Object),
                        geometry: expect.any(Object),
                        comment_id: expect.any(Number),
                        impact: expect.any(String),
                        comment: expect.any(String),
                    });
                });
            });
    });
});

describe('GET /api/comments/receptor/:receptor_id', () => {
    test('200: comments', () => {
        return request(app)
            .get('/api/comments/receptor/1')
            .expect(200)
            .then((result) => {
                result.body.comments.forEach((comm) => {
                    expect(comm).toEqual({
                        receptor_id: expect.any(Number),
                        comment_id: expect.any(Number),
                        impact: expect.any(String),
                        comment: expect.any(String),
                    });
                });
            });
    });
    test('200: comments are ordered', () => {
        return request(app)
            .get('/api/comments/receptor/1')
            .expect(200)
            .then((result) => {
                if (result.body.comments.length > 1) {
                    expect(result.body.comments[0].comment_id).toBeGreaterThan(
                        result.body.comments[1].comment_id
                    );
                }
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
                    comment_id: 4,
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
