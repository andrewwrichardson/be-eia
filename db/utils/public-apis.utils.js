const turf = require('@turf/turf');
const { jsToPgFormatReceptors } = require(`./data-manipulation.utils`);
const db = require('../connection');
const format = require('pg-format');
const lodash = require('lodash');

exports.dataclip = async (geojson, project_id, assessmentArea) => {
    let assessmentAreaPolygon = assessmentArea;
    let geojsonCopy = lodash.cloneDeep(geojson);
    const points = [];
    geojsonCopy.features.forEach((feature) => {
        if (feature.geometry.type === 'Point') {
            points.push(feature);
        }
    });

    const ptsWithin = turf.pointsWithinPolygon(
        turf.featureCollection(points),
        assessmentAreaPolygon
    );

    const allFeatures = ptsWithin;

    //// find overlapping lines
    const lineString = [];
    geojsonCopy.features.forEach((feature) => {
        if (feature.geometry.type === 'LineString') {
            lineString.push(feature);
        }
    });

    const splitArr = [];
    lineString.forEach((feature) => {
        assessmentAreaPolygon.features.forEach((assessmentAreaPolygon) => {
            if (turf.booleanWithin(feature, assessmentAreaPolygon)) {
                allFeatures.features.push(feature);
            } else {
                const split = turf.lineSplit(feature, assessmentAreaPolygon);
                split.features.forEach((obj) => {
                    obj.properties = feature.properties;
                    obj.id = feature.id;
                    splitArr.push(obj);
                });
            }
        });
    });

    splitArr.forEach((splitLines) => {
        assessmentAreaPolygon.features.forEach((assessmentAreaPolygon) => {
            let length = turf.length(splitLines);
            let center = turf.along(splitLines, length);
            let overlapping = turf.booleanWithin(center, assessmentAreaPolygon);

            if (overlapping == true) {
                allFeatures.features.push(splitLines);
            }
        });
    });

    const polygons = [];
    geojsonCopy.features.forEach((feature) => {
        if (feature.geometry.type === 'Polygon') {
            polygons.push(feature);
        }
    });

    const polygonsWthn = [];
    polygons.forEach((polygon) => {
        assessmentAreaPolygon.features.forEach((assessmentAreaPolygon) => {
            let intersection = turf.intersect(polygon, assessmentAreaPolygon);

            if (intersection !== null) {
                intersection.type = polygon.type;
                intersection.properties = polygon.properties;
                intersection.id = polygon.id;
                allFeatures.features.push(intersection);
            }
        });
    });

    const public_apis = await db.query(`SELECT * FROM public_apis;`);

    const allFeaturesKey = addKeywords(allFeatures);

    const receptors = addApiId(project_id, allFeaturesKey, public_apis);

    const receptorsWithDesc = addReceptorDesc(receptors, public_apis);

    return receptorsWithDesc;
};

const addApiId = (project_id, allFeatures, public_apis) => {
    const receptors = [];

    public_apis.rows.forEach((api, index) => {
        allFeatures.features.forEach((feature) => {
            let keys = Object.keys(feature.properties);
            let bool = keys.some((key) => {
                return key === api.keywords;
            });
            if (bool) {
                receptors.push({
                    project_id: project_id,
                    api_id: api.api_id,
                    geometry: turf.featureCollection([feature]),
                });
            }
        });
    });
    return receptors;
};

exports.insertReceptorsData = async (receptors, project_id) => {
    await db.query(`DELETE FROM receptors WHERE project_id = $1;`, [
        project_id,
    ]);

    const formattedReceptors = jsToPgFormatReceptors(receptors);

    queryString = format(
        `INSERT INTO receptors (project_id, api_id, geom, osm_id, type, properties) VALUES %L RETURNING *;`,
        formattedReceptors
    );

    const result = await db.query(queryString);

    if (result.rows.length > 0) {
        return {
            msg: `OK`,
        };
    }
};

exports.getBbox = (assessmentArea) => {
    const BboxArr = turf.bbox(assessmentArea);
    const Bbox = {
        minLat: BboxArr[1],
        maxLat: BboxArr[3],
        minLong: BboxArr[0],
        maxLong: BboxArr[2],
    };

    return Bbox;
};

const addKeywords = (allFeatures) => {
    allFeatures.features.forEach((feature) => {
        let propArrValues = Object.values(feature.properties);
        let propArrKeys = Object.keys(feature.properties);

        if (
            propArrKeys.includes('natural') &&
            propArrValues.includes('water')
        ) {
            feature.properties.waterbody = 'Water Body';
        } else if (
            propArrKeys.includes('natural') &&
            propArrValues.includes('wood')
        ) {
            feature.properties.wood = 'Wood';
        } else if (
            propArrKeys.includes('natural') &&
            propArrValues.includes('tree')
        ) {
            feature.properties.tree = 'Tree';
        } else if (propArrKeys.includes('addr:street')) {
            feature.properties.building = 'building';
        }
    });
    return allFeatures;
};

const addReceptorDesc = (receptors, public_apis) => {
    const validKeys = [
        [
            'building',
            'name',
            'addr:housename',
            'addr:street',
            'addr:city',
            'addr:postcode',
            'amenity',
            'man_made',
        ],
        ['name', 'waterway', 'tunnel', 'notes'],
        ['name', 'water', 'notes', 'waterbody'],
        [],
        [
            'historic',
            'memorial',
            'name',
            'operator',
            'building',
            'historic:period',
        ],
        ['wood', 'name', 'leaf_type', 'operator'],
        ['leaf_cycle', 'leaf_type', 'species', 'tree'],
    ];

    public_apis.rows.forEach((publicApi, idx) => {
        receptors.forEach((group) => {
            if (group.api_id === publicApi.api_id) {
                group.geometry.features.forEach((feature) => {
                    const propArr = Object.keys(feature.properties);

                    let desc = ``;

                    propArr.forEach((prop) => {
                        let bool = validKeys[idx].some((key) => {
                            return key === prop;
                        });

                        if (bool) {
                            desc = desc + ` ${feature.properties[prop]} -`;
                        }
                    });
                    desc = desc.replace(/- yes /, '');
                    desc = desc.replace(/-$/, '');
                    feature.properties.desc = desc;
                });
            }
        });
    });
    return receptors;
};
