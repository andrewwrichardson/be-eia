const app = require("../app");
const db = require("../db/connection");
const { seed } = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");

const postApiData = require("../models/public-apis.models");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("populate receptor from public API", () => {
  test("should not mutate", () => {
    const result = postApiData(1);
    console.log(result, "result");
    expect(result).toEqual(1);
  });
});
