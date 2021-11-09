const app = require('../app');
const db = require('../db/connection');
const { seed } = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');

const request = require('supertest');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET /api/receptors/:project_id', () => {
    test('200: retrieve all receptors for project_id', () => {
        return request(app)
            .get('/api/receptors/1')
            .expect(200)
            .then((result) => {
                result.body.receptors.forEach((receptor) => {
                    expect(receptor).toEqual({
                        receptor_id: expect.any(Number),
                        project_id: expect.any(Number),
                        api_id: expect.any(Number),
                        osm_id: expect.any(String),
                        type: expect.any(String),
                        properties: expect.any(Object),
                        geometry: expect.any(Object),
                    });
                });
            });
    });
});
