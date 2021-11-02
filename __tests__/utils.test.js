const {
  jsToPgFormatProjects,
  jsToPgFormatAssessmentAreas,
  jsToPgFormatPublicApis,
  jsToPgFormatReceptors,
  jsToPgFormatComments,
} = require("../db/utils/data-manipulation.utils");

const receptorData = require(`../db/data/test-data/receptors`);

describe("jsToPgFormatProjects", () => {
  const rawData = [
    {
      project_name: "Project One",
    },
  ];
  test("should not mutate", () => {
    jsToPgFormatProjects(rawData);
    expect(rawData).toEqual([
      {
        project_name: "Project One",
      },
    ]);
  });
  test("should return formated data array", () => {
    expect(jsToPgFormatProjects(rawData)).toEqual([["Project One"]]);
  });
});

describe("jsToPgFormatAssessmentAreas", () => {
  const rawData = [
    {
      project_id: 1,
      geometry: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [26.910678148269653, 46.540399297719794],
                  [26.91220164299011, 46.540399297719794],
                  [26.91220164299011, 46.54099705451672],
                  [26.910678148269653, 46.54099705451672],
                  [26.910678148269653, 46.540399297719794],
                ],
              ],
            },
          },
        ],
      },
    },
  ];
  test("should not mutate", () => {
    jsToPgFormatAssessmentAreas(rawData);
    expect(rawData).toEqual([
      {
        project_id: 1,
        geometry: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [26.910678148269653, 46.540399297719794],
                    [26.91220164299011, 46.540399297719794],
                    [26.91220164299011, 46.54099705451672],
                    [26.910678148269653, 46.54099705451672],
                    [26.910678148269653, 46.540399297719794],
                  ],
                ],
              },
            },
          ],
        },
      },
    ]);
  });
  test("should return formated data array", () => {
    expect(jsToPgFormatAssessmentAreas(rawData)).toEqual([
      [
        1,
        {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [26.910678148269653, 46.540399297719794],
                    [26.91220164299011, 46.540399297719794],
                    [26.91220164299011, 46.54099705451672],
                    [26.910678148269653, 46.54099705451672],
                    [26.910678148269653, 46.540399297719794],
                  ],
                ],
              },
            },
          ],
        },
      ],
    ]);
  });
});

describe("jsToPgFormatPublicApis", () => {
  const rawData = [
    {
      url: 'https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:25];(node["addr:street"]',
      source: "Open Steet Map",
      category: "Community and Private Assets",
    },
  ];
  test("should not mutate", () => {
    jsToPgFormatPublicApis(rawData);
    expect(rawData).toEqual([
      {
        url: 'https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:25];(node["addr:street"]',
        source: "Open Steet Map",
        category: "Community and Private Assets",
      },
    ]);
  });
  test("should return formated data array", () => {
    expect(jsToPgFormatPublicApis(rawData)).toEqual([
      [
        'https://lz4.overpass-api.de/api/interpreter/?data=[out:json][timeout:25];(node["addr:street"]',
        "Open Steet Map",
        "Community and Private Assets",
      ],
    ]);
  });
});

describe("jsToPgFormatReceptors", () => {
  const rawData = [...receptorData];
  test("should not mutate", () => {
    jsToPgFormatReceptors(rawData);
    expect(rawData).toEqual([...receptorData]);
  });
  test("should return formated array", () => {
    expect(jsToPgFormatReceptors(rawData)).toEqual([
      [
        1,
        1,
        {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [26.911211907863617, 46.5411778562022],
                    [26.911265552043915, 46.54002846380659],
                    [26.911895871162415, 46.54003215370873],
                    [26.911721527576447, 46.54124980772586],
                    [26.911211907863617, 46.5411778562022],
                  ],
                ],
              },
            },
          ],
        },
      ],
    ]);
  });
});

describe("jsToPgFormatComments", () => {
  const rawData = [
    {
      receptor_id: 1,
      impact: "low",
      comment: "bla bla bla bla bla",
    },
  ];
  test("should not mutate", () => {
    jsToPgFormatComments(rawData);
    expect(rawData).toEqual([
      {
        receptor_id: 1,
        impact: "low",
        comment: "bla bla bla bla bla",
      },
    ]);
  });
  test("should return formated array", () => {
    expect(jsToPgFormatComments(rawData)).toEqual([
      [1, "low", "bla bla bla bla bla"],
    ]);
  });
});
