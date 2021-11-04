const app = require("../app");
const db = require("../db/connection");
const { seed } = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const geojson = require("../db/data/test-data/osm-input.json");
const { dataclip } = require("../db/utils/public-api-dataclip.util");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("populate receptor from public API", () => {
  test("should not mutate", async () => {
    const result = await dataclip(geojson, 1);
    //console.log(result, "result");
    expect(result).toEqual(1);
  });
});
