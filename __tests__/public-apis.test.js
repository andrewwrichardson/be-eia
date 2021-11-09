const db = require("../db/connection");
const { seed } = require("../db/seeds/seed");
const testData = require("../db/data/test-data/public-api-data/index");
const request = require(`supertest`);
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());
jest.setTimeout(30000);

describe("GET - initiate public-api", () => {
  test("returns OSM data - status 200", () => {
    return request(app)
      .get(`/api/public-apis/1`)
      .expect(200)
      .then((result) => {
        expect(result.body.msg).toEqual("OK");
      });
  });

  test("returns OSM data - no datafound", () => {
    return request(app)
      .get(`/api/public-apis/2`)
      .expect(404)
      .then((result) => {
        expect(result.body.msg).toEqual("No OSM Data Found");
      });
  });
});
