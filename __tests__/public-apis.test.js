const app = require("../app");
const db = require("../db/connection");
const { seed } = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");

const retrieveOSMRivers = require("../models/public-apis.models");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("populate receptor from public API", () => {
  test("should not mutate", async () => {
    const result = await retrieveOSMRivers(1);
    console.log(result, "result");
    expect(result).toEqual(1);
  });
});
