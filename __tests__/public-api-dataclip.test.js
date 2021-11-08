const db = require("../db/connection");
const { seed } = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const geojson = require("../db/data/test-data/osm-input.json");
const dataClipOutput = require("../db/data/test-data/public-api-dataclip-output.json");
const geojsonNotMutated = require("../db/data/test-data/osm-input-not-mutated.json");
const { dataclip, getBbox } = require("../db/utils/public-api-dataclip.util");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("DataClip util function", () => {
  test.only("should not mutate inputs", async () => {
    const project_id = 1;
    const api_id = 1;
    const assessmentArea = await db.query(
      `SELECT json_build_object(
                'type', 'FeatureCollection',
                'features', json_agg(json_build_object('type','Feature','properties',json_build_object(),'geometry',ST_AsGeoJSON(assessment_areas.geom)::json)))
                 FROM assessment_areas
                 WHERE project_id = $1;`,
      [project_id]
    );

    const assessmentAreaFC = assessmentArea.rows[0].json_build_object;

    const result = await dataclip(
      geojson,
      project_id,
      api_id,
      assessmentAreaFC
    );
    expect(geojson).toEqual(geojsonNotMutated);
    expect(project_id).toEqual(1);
    expect(api_id).toEqual(1);
  });
  test("Output should be in a prescribed format", async () => {
    const project_id = 1;
    const assessmentArea = await db.query(
      `SELECT json_build_object(
                'type', 'FeatureCollection',
                'features', json_agg(json_build_object('type','Feature','properties',json_build_object(),'geometry',ST_AsGeoJSON(assessment_areas.geom)::json)))
                 FROM assessment_areas
                 WHERE project_id = $1;`,
      [project_id]
    );

    const assessmentAreaFC = assessmentArea.rows[0].json_build_object;
    const result = await dataclip(geojson, 1, 1, assessmentAreaFC);
    expect(result).toEqual(dataClipOutput);
  });
});

describe("getBbox", () => {
  test("Bbox is provided in correct format", async () => {
    let project_id = 1;
    const assessmentArea = await db.query(
      `SELECT json_build_object(
            'type', 'FeatureCollection',
            'features', json_agg(json_build_object('type','Feature','properties',json_build_object(),'geometry',ST_AsGeoJSON(assessment_areas.geom)::json)))
             FROM assessment_areas
             WHERE project_id = $1;`,
      [project_id]
    );
    const result = getBbox(assessmentArea.rows[0].json_build_object);
    console.log(result);
    const Bbox = {
      minLat: 54.502103258,
      maxLat: 54.509239038,
      minLong: -6.094332933,
      maxLong: -6.079859734,
    };
    expect(result).toEqual(Bbox);
  });
});
