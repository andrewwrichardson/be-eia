const app = require("../app");
const db = require("../db/connection");
const { seed } = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const geojson = require("../db/data/test-data/dataClip-osm-input.json");
const dataClipOutput = require("../db/data/test-data/public-api-dataclip-output.json");
const geojsonTestCopy = require("../db/data/test-data/dataClip-osm-input-test-copy.json");
const { dataclip } = require("../db/utils/public-api-dataclip.util");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("populate receptor from public API", () => {
  test("should not mutate inputs", async () => {
    const project_id = 1;
    const api_id = 1;
    const result = await dataclip(geojson, project_id, api_id);
    console.log(result, "result");
    expect(geojson).toEqual(geojsonTestCopy);
    expect(project_id).toEqual(1);
    expect(api_id).toEqual(1);
  });
  test("Output should be in a prescribed format", async () => {
    const result = await dataclip(geojson, 1, 1);
    expect(result).toEqual(dataClipOutput);
  });
});
