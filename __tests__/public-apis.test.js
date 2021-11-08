const db = require("../db/connection");
const { seed } = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const request = require(`supertest`);
const { callPublicApis } = require("../controllers/public-apis.controllers");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET - initiate public-api", () => {
  test("returns OSM data", () => {
    return request(app)
      .get(`/api/public-apis/1`)
      .expect(200)
      .then((result) => {
        expect(result.body.successful).toEqual(true);
      });
  });
});
