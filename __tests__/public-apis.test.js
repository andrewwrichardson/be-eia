const db = require("../db/connection");
const { seed } = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");

const { callPublicApis } = require("../controllers/public-apis.controllers");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("populate receptor from public API", () => {
  test("should not mutate", async () => {
    const result = await callPublicApis();
    console.log(result, "result");
    expect(result).toEqual(1);
  });
});
