// Referencing: week 5 and week 6 source codes in the lecture notes

const jsonQuery = {
    "query": [
        {
            "code": "Vuosi",
            "selection": {
                "filter": "item",
                "values": [
                    "1996",
                    "2000",
                    "2004",
                    "2008",
                    "2012",
                    "2017",
                    "2021"
                ]
            }
        },
        {
            "code": "Alue",
            "selection": {
                "filter": "item",
                "values": [
                    "000000",
                    "011091",
                    "021049",
                    "021078",
                    "021092",
                    "021106",
                    "021186",
                    "021235",
                    "021245",
                    "021257",
                    "021444",
                    "021543",
                    "021638",
                    "021858",
                    "022224",
                    "022434",
                    "022505",
                    "022710",
                    "022753",
                    "022927",
                    "023018",
                    "023149",
                    "023407",
                    "023504",
                    "023611",
                    "023616",
                    "023755",
                    "031202",
                    "031680",
                    "031734",
                    "031853",
                    "032400",
                    "032423",
                    "032430",
                    "032445",
                    "032481",
                    "032503",
                    "032529",
                    "032577",
                    "032895",
                    "033019",
                    "033284",
                    "033304",
                    "033322",
                    "033480",
                    "033538",
                    "033561",
                    "033631",
                    "033636",
                    "033704",
                    "033738",
                    "033761",
                    "033833",
                    "033918",
                    "041079",
                    "041609",
                    "041684",
                    "042050",
                    "042102",
                    "042214",
                    "042886",
                    "043051",
                    "043181",
                    "043230",
                    "043271",
                    "043484",
                    "043531",
                    "043608",
                    "043747",
                    "043783",
                    "061061",
                    "061098",
                    "061109",
                    "061111",
                    "061398",
                    "061694",
                    "062016",
                    "062082",
                    "062165",
                    "062560",
                    "063081",
                    "063086",
                    "063103",
                    "063142",
                    "063169",
                    "063316",
                    "063433",
                    "063576",
                    "063781",
                    "063834",
                    "063981",
                    "071211",
                    "071418",
                    "071536",
                    "071604",
                    "071837",
                    "071908",
                    "071980",
                    "072020",
                    "072108",
                    "072508",
                    "072562",
                    "072581",
                    "072790",
                    "073143",
                    "073177",
                    "073250",
                    "073291",
                    "073619",
                    "073635",
                    "073702",
                    "073887",
                    "073922",
                    "073936",
                    "081075",
                    "081153",
                    "081285",
                    "081286",
                    "081405",
                    "081491",
                    "081740",
                    "082593",
                    "083046",
                    "083097",
                    "083178",
                    "083213",
                    "083416",
                    "083441",
                    "083489",
                    "083507",
                    "083580",
                    "083588",
                    "083623",
                    "083624",
                    "083681",
                    "083689",
                    "083700",
                    "083739",
                    "083768",
                    "083831",
                    "083935",
                    "091140",
                    "091167",
                    "091297",
                    "091915",
                    "092276",
                    "092309",
                    "092422",
                    "092541",
                    "092749",
                    "092778",
                    "093090",
                    "093146",
                    "093171",
                    "093176",
                    "093204",
                    "093239",
                    "093260",
                    "093263",
                    "093402",
                    "093420",
                    "093426",
                    "093595",
                    "093607",
                    "093686",
                    "093687",
                    "093707",
                    "093762",
                    "093844",
                    "093848",
                    "093857",
                    "093921",
                    "093925",
                    "101231",
                    "101272",
                    "101598",
                    "101743",
                    "101905",
                    "102005",
                    "102010",
                    "102145",
                    "102232",
                    "102233",
                    "102301",
                    "102399",
                    "102408",
                    "102499",
                    "103052",
                    "103074",
                    "103151",
                    "103152",
                    "103217",
                    "103218",
                    "103236",
                    "103280",
                    "103287",
                    "103288",
                    "103300",
                    "103403",
                    "103421",
                    "103440",
                    "103475",
                    "103545",
                    "103584",
                    "103599",
                    "103759",
                    "103846",
                    "103849",
                    "103893",
                    "103924",
                    "103934",
                    "103946",
                    "103989",
                    "111179",
                    "112182",
                    "112249",
                    "112410",
                    "112500",
                    "112992",
                    "113077",
                    "113172",
                    "113216",
                    "113226",
                    "113256",
                    "113265",
                    "113275",
                    "113312",
                    "113435",
                    "113495",
                    "113592",
                    "113601",
                    "113729",
                    "113850",
                    "113892",
                    "113931",
                    "121205",
                    "121244",
                    "121564",
                    "121678",
                    "122069",
                    "122139",
                    "122208",
                    "122290",
                    "122305",
                    "122425",
                    "122494",
                    "122535",
                    "122563",
                    "122765",
                    "122977",
                    "123009",
                    "123071",
                    "123072",
                    "123105",
                    "123317",
                    "123436",
                    "123483",
                    "123578",
                    "123615",
                    "123620",
                    "123625",
                    "123626",
                    "123630",
                    "123691",
                    "123697",
                    "123746",
                    "123748",
                    "123777",
                    "123785",
                    "123791",
                    "123832",
                    "123859",
                    "123889",
                    "131240",
                    "131698",
                    "131851",
                    "132241",
                    "132320",
                    "132758",
                    "133047",
                    "133148",
                    "133261",
                    "133273",
                    "133498",
                    "133583",
                    "133614",
                    "133683",
                    "133732",
                    "133742",
                    "133751",
                    "133845",
                    "133854",
                    "133890",
                    "133976",
                    "051478",
                    "053035",
                    "053043",
                    "053060",
                    "053062",
                    "053065",
                    "053076",
                    "053170",
                    "053295",
                    "053318",
                    "053417",
                    "053438",
                    "053736",
                    "053766",
                    "053771",
                    "053941"
                ]
            }
        },
        {
            "code": "Puolue",
            "selection": {
                "filter": "item",
                "values": [
                    "00",
                    "03",
                    "01",
                    "04",
                    "02",
                    "05",
                    "06",
                    "07",
                    "08"
                ]
            }
        },
        {
            "code": "Tiedot",
            "selection": {
                "filter": "item",
                "values": [
                    "aanet_yht"
                ]
            }
        }
    ],
    "response": {
        "format": "json-stat2"
    }
}

async function fetchData() {
    const urlGeoJson = 'https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326';
    const urlElections = 'https://pxdata.stat.fi:443/PxWeb/api/v1/en/StatFin/kvaa/statfin_kvaa_pxt_12g3.px'
    // const urlPositiveMigration = 'https://statfin.stat.fi/PxWeb/sq/4bb2c735-1dc3-4c5e-bde7-2165df85e65f';
    // const urlNegativeMigration = 'https://statfin.stat.fi/PxWeb/sq/944493ca-ea4d-4fd9-a75c-4975192f7b6e';

    try {
        const [geoData, electionsData, positiveMigrationData, negativeMigrationData] = await Promise.all([
            fetch(urlGeoJson).then(res => res.json()),
            fetch(urlElections, {
                method: 'POST',
                headers: { "content-type": "application/json" },
                body: JSON.stringify(jsonQuery)
            }).then(res => res.json()),
            // fetch(urlPositiveMigration).then(res => res.json()),
            // fetch(urlNegativeMigration).then(res => res.json())
        ]);
        console.log(electionsData);

        const electionsInfo = processElectionsData(electionsData);
        // const positiveMigrations = processMigrationData(positiveMigrationData, 'Tuloalue');
        // const negativeMigrations = processMigrationData(negativeMigrationData, 'Lähtöalue');

        //createMap(geoData, positiveMigrations, negativeMigrations);
        createMap(geoData);

    } catch (error) {
        console.log("Error happened while fetching: ", error);
    }
}

// const processMigrationData = (data, type) => {
//     const municipalities = data.dataset.dimension[type].category.label;
//     const values = data.dataset.value;
//     const migrations = {};

//     Object.keys(municipalities).forEach((key, index) => {
//         let municipalityName = municipalities[key];
//         municipalityName = type === 'Tuloalue' ? municipalityName.replace("Arrival - ", "") : municipalityName.replace("Departure - ", "");
//         migrations[municipalityName] = values[index];
//     });

//     return migrations;
// }

const processElectionsData = (data) => {
    const municipalities = data.dimension['Alue'].category.label;
    const parties = ['Total', 'KOK', 'SDP', 'KESK', 'PS', 'VIHR', 'VAS', 'RKP', 'KD'];
    const years = data.dimension['Vuosi'].category.label;
    const values = data.value;

    // Number of municipalities and parties based on the provided data structure
    const numMunicipalities = Object.keys(municipalities).length;
    const numParties = parties.length;

    // Create an array of municipality keys, mapped to an object that keeps both original string and numeric representation.
    const municipalityKeyMappings = Object.keys(municipalities).map(key => ({ originalKey: key, numericKey: parseInt(key) }));

    // Sort the municipalities by their numeric key representation
    municipalityKeyMappings.sort((a, b) => a.numericKey - b.numericKey);

    // Prepare the results object
    const results = {};

    // Process the sorted municipalities
    municipalityKeyMappings.forEach((mapping, municipalityIndex) => {
        let municipalityName = municipalities[mapping.originalKey];

        // If the municipality is not "Mainland Finland", remove the first four characters of its name
        if (municipalityName !== 'Mainland Finland') {
            municipalityName = municipalityName.substring(4); // Removing the first four characters
        }

        results[municipalityName] = {};

        // For each year
        Object.values(years).forEach((year, yearIndex) => {
            results[municipalityName][year] = {};

            // For each party
            parties.forEach((party, partyIndex) => {
                // Calculate the index in the values array. This formula is based on your described data structure.
                const valueIndex = (
                    yearIndex * numMunicipalities * numParties +
                    municipalityIndex * numParties +
                    partyIndex
                );

                // Retrieve the value from the values array using the calculated index
                const value = values[valueIndex];

                // Store the value in the results object
                results[municipalityName][year][party] = value;
            });
        });
    });

    // Output the final results object
    console.log(results);

    return results;
}

function createMap(data) {
    if (!data) {
        return;
    }

    const map = L.map('map', {
        minZoom: -3,
    });

    const geoJson = L.geoJSON(data, {
        // onEachFeature: (feature, layer) => getCustomFeature(feature, layer, positiveMigrations, negativeMigrations),
        onEachFeature: (feature, layer) => getCustomFeature(feature, layer),
        // style: (feature) => getCustomStyle(feature, positiveMigrations, negativeMigrations),
        style: (feature) => getCustomStyle(feature),
        weight: 2
    }).addTo(map);

    const openstreetMap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap"
    }).addTo(map);

    map.fitBounds(geoJson.getBounds());
}

const getCustomFeature = (feature, layer) => {
    if (!feature.properties.name) {
        return;
    }

    const municipalityName = feature.properties.name;
    layer.bindTooltip(municipalityName);

    // const positiveMigrationsValues = positiveMigrations[municipalityName] || "Unknown";
    // const negativeMigrationsValues = negativeMigrations[municipalityName] || "Unknown";
    // layer.bindPopup(
    //     `<ul>
    //         <li>Name: ${municipalityName}</li>
    //         <li>Positive migration: ${positiveMigrationsValues}</li>
    //         <li>Negative migration: ${negativeMigrationsValues}</li>
    //     </ul>`
    // );
}

const getCustomStyle = (feature) => {
    return;


    // if (!feature.properties.name) {
    //     return;
    // }
    // const municipalityName = feature.properties.name;
    // const negativeMigrationValue = negativeMigrations[municipalityName];

    // if (negativeMigrationValue === 0) {
    //     return {
    //         color: '#FF0000',
    //     }
    // }

    // let hue = Math.pow((positiveMigrations[municipalityName] / negativeMigrationValue), 3) * 60;
    // hue = Math.min(hue, 120);

    // return {
    //     color: `hsl(${hue}, 75%, 50%)`,
    // }
}

fetchData();
