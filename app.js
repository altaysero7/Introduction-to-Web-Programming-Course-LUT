// Referencing: week 5 and week 6 source codes in the lecture notes
// Referencing: https://pxdata.stat.fi/PxWeb/pxweb/en/StatFin/StatFin__kvaa/statfin_kvaa_pxt_12g3.px/
// Referencing: https://vaalit.yle.fi/kv2021/fi/
// Referencing: https://gisgeography.com/map-legend/
// Referencing: https://www.highcharts.com/demo
// Referencing: https://commons.wikimedia.org/wiki/File:Flag_of_Finland.svg

const jsonQueryElections = {
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

const jsonQueryMigrations = {
    "query": [
        {
            "code": "Tuloalue",
            "selection": {
                "filter": "item",
                "values": [
                    "SSS",
                    "KU020",
                    "KU005",
                    "KU009",
                    "KU010",
                    "KU016",
                    "KU018",
                    "KU019",
                    "KU035",
                    "KU043",
                    "KU046",
                    "KU047",
                    "KU049",
                    "KU050",
                    "KU051",
                    "KU052",
                    "KU060",
                    "KU061",
                    "KU062",
                    "KU065",
                    "KU069",
                    "KU071",
                    "KU072",
                    "KU074",
                    "KU075",
                    "KU076",
                    "KU077",
                    "KU078",
                    "KU079",
                    "KU081",
                    "KU082",
                    "KU086",
                    "KU111",
                    "KU090",
                    "KU091",
                    "KU097",
                    "KU098",
                    "KU102",
                    "KU103",
                    "KU105",
                    "KU106",
                    "KU108",
                    "KU109",
                    "KU139",
                    "KU140",
                    "KU142",
                    "KU143",
                    "KU145",
                    "KU146",
                    "KU153",
                    "KU148",
                    "KU149",
                    "KU151",
                    "KU152",
                    "KU165",
                    "KU167",
                    "KU169",
                    "KU170",
                    "KU171",
                    "KU172",
                    "KU176",
                    "KU177",
                    "KU178",
                    "KU179",
                    "KU181",
                    "KU182",
                    "KU186",
                    "KU202",
                    "KU204",
                    "KU205",
                    "KU208",
                    "KU211",
                    "KU213",
                    "KU214",
                    "KU216",
                    "KU217",
                    "KU218",
                    "KU224",
                    "KU226",
                    "KU230",
                    "KU231",
                    "KU232",
                    "KU233",
                    "KU235",
                    "KU236",
                    "KU239",
                    "KU240",
                    "KU320",
                    "KU241",
                    "KU322",
                    "KU244",
                    "KU245",
                    "KU249",
                    "KU250",
                    "KU256",
                    "KU257",
                    "KU260",
                    "KU261",
                    "KU263",
                    "KU265",
                    "KU271",
                    "KU272",
                    "KU273",
                    "KU275",
                    "KU276",
                    "KU280",
                    "KU284",
                    "KU285",
                    "KU286",
                    "KU287",
                    "KU288",
                    "KU290",
                    "KU291",
                    "KU295",
                    "KU297",
                    "KU300",
                    "KU301",
                    "KU304",
                    "KU305",
                    "KU312",
                    "KU316",
                    "KU317",
                    "KU318",
                    "KU398",
                    "KU399",
                    "KU400",
                    "KU407",
                    "KU402",
                    "KU403",
                    "KU405",
                    "KU408",
                    "KU410",
                    "KU416",
                    "KU417",
                    "KU418",
                    "KU420",
                    "KU421",
                    "KU422",
                    "KU423",
                    "KU425",
                    "KU426",
                    "KU444",
                    "KU430",
                    "KU433",
                    "KU434",
                    "KU435",
                    "KU436",
                    "KU438",
                    "KU440",
                    "KU441",
                    "KU475",
                    "KU478",
                    "KU480",
                    "KU481",
                    "KU483",
                    "KU484",
                    "KU489",
                    "KU491",
                    "KU494",
                    "KU495",
                    "KU498",
                    "KU499",
                    "KU500",
                    "KU503",
                    "KU504",
                    "KU505",
                    "KU508",
                    "KU507",
                    "KU529",
                    "KU531",
                    "KU535",
                    "KU536",
                    "KU538",
                    "KU541",
                    "KU543",
                    "KU545",
                    "KU560",
                    "KU561",
                    "KU562",
                    "KU563",
                    "KU564",
                    "KU309",
                    "KU576",
                    "KU577",
                    "KU578",
                    "KU445",
                    "KU580",
                    "KU581",
                    "KU599",
                    "KU583",
                    "KU854",
                    "KU584",
                    "KU588",
                    "KU592",
                    "KU593",
                    "KU595",
                    "KU598",
                    "KU601",
                    "KU604",
                    "KU607",
                    "KU608",
                    "KU609",
                    "KU611",
                    "KU638",
                    "KU614",
                    "KU615",
                    "KU616",
                    "KU619",
                    "KU620",
                    "KU623",
                    "KU624",
                    "KU625",
                    "KU626",
                    "KU630",
                    "KU631",
                    "KU635",
                    "KU636",
                    "KU678",
                    "KU710",
                    "KU680",
                    "KU681",
                    "KU683",
                    "KU684",
                    "KU686",
                    "KU687",
                    "KU689",
                    "KU691",
                    "KU694",
                    "KU697",
                    "KU698",
                    "KU700",
                    "KU702",
                    "KU704",
                    "KU707",
                    "KU729",
                    "KU732",
                    "KU734",
                    "KU736",
                    "KU790",
                    "KU738",
                    "KU739",
                    "KU740",
                    "KU742",
                    "KU743",
                    "KU746",
                    "KU747",
                    "KU748",
                    "KU791",
                    "KU749",
                    "KU751",
                    "KU753",
                    "KU755",
                    "KU758",
                    "KU759",
                    "KU761",
                    "KU762",
                    "KU765",
                    "KU766",
                    "KU768",
                    "KU771",
                    "KU777",
                    "KU778",
                    "KU781",
                    "KU783",
                    "KU831",
                    "KU832",
                    "KU833",
                    "KU834",
                    "KU837",
                    "KU844",
                    "KU845",
                    "KU846",
                    "KU848",
                    "KU849",
                    "KU850",
                    "KU851",
                    "KU853",
                    "KU857",
                    "KU858",
                    "KU859",
                    "KU886",
                    "KU887",
                    "KU889",
                    "KU890",
                    "KU892",
                    "KU893",
                    "KU895",
                    "KU785",
                    "KU905",
                    "KU908",
                    "KU092",
                    "KU915",
                    "KU918",
                    "KU921",
                    "KU922",
                    "KU924",
                    "KU925",
                    "KU927",
                    "KU931",
                    "KU934",
                    "KU935",
                    "KU936",
                    "KU941",
                    "KU946",
                    "KU976",
                    "KU977",
                    "KU980",
                    "KU981",
                    "KU989",
                    "KU992"
                ]
            }
        },
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
        }
    ],
    "response": {
        "format": "json-stat2"
    }
}

let map;
let geoJson;
const partiesInfo = {
    'KOK': { color: '#005cb7', wikiLink: 'https://en.wikipedia.org/wiki/National_Coalition_Party' },
    'SDP': { color: '#ff0606', wikiLink: 'https://en.wikipedia.org/wiki/Social_Democratic_Party_of_Finland' },
    'KESK': { color: '#209e3a', wikiLink: 'https://en.wikipedia.org/wiki/Centre_Party_(Finland)' },
    'PS': { color: '#00c2ef', wikiLink: 'https://en.wikipedia.org/wiki/Finns_Party' },
    'VIHR': { color: '#6bd12a', wikiLink: 'https://en.wikipedia.org/wiki/Green_League' },
    'VAS': { color: '#c60034', wikiLink: 'https://en.wikipedia.org/wiki/Left_Alliance_(Finland)' },
    'RKP': { color: '#f9b800', wikiLink: 'https://en.wikipedia.org/wiki/Swedish_People%27s_Party_of_Finland' },
    'KD': { color: '#7946e8', wikiLink: 'https://en.wikipedia.org/wiki/Christian_Democrats_(Finland)' },
    'Others': { color: '#800080' },
    'No data': { color: '#808080' }
};
let selectedYear = '2021';
let geoData;
let allElectionData;
let positiveMigrationsData;
let negativeMigrationsData;

document.addEventListener('DOMContentLoaded', async (event) => {
    map = L.map('map', { minZoom: -3 });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap"
    }).addTo(map);

    // fetching necessary data
    await fetchGeoData();
    await fetchAllElectionData();
    await fetchMigrationData();
    updateMapForYear(selectedYear);
    createMapLegend();
    const mainlandFinlandResultsControl = createMainlandFinlandResultsControl();
    map.addControl(mainlandFinlandResultsControl);
    updateMainlandFinlandResults()
    const flagControl = createFlagControl();
    flagControl.addTo(map);

    const yearButtons = document.querySelectorAll('.year-btn');
    yearButtons.forEach(button => {
        button.addEventListener('click', function () {
            selectedYear = this.getAttribute('data-year');
            updateMapForYear(selectedYear); // changing the elections data and re-creating the map
            updateMainlandFinlandResults()
        });
    });

    document.getElementById('back-button').addEventListener('click', function () {
        // hiding charts and 'Back' button
        document.getElementById('charts').style.display = 'none';
        this.style.display = 'none';

        // showing the map and other elements again
        document.getElementById('map').style.display = 'block';
        document.getElementById('map-legend').style.display = 'block';
        document.querySelectorAll('.year-buttons').forEach(el => el.style.display = 'block');
        document.getElementById('year-selector').style.display = 'block';

        if (history.state && history.state.municipality) {
            history.back(); // Revert to previous state
        } else {
            // cleaning up the URL to its base form without any query parameters
            const originalLocation = location.protocol + '//' + location.host + location.pathname;
            history.replaceState(null, "", originalLocation); // Replaces the current history entry with the original location
        }
    });
});

self.addEventListener('popstate', function (event) {
    if (event.state && event.state.municipality) {
        history.back();
    } else {
        // hiding charts and 'Back' button
        document.getElementById('charts').style.display = 'none';
        document.getElementById('back-button').style.display = 'none';

        // showing the map and other elements again
        document.getElementById('map').style.display = 'block';
        document.getElementById('map-legend').style.display = 'block';
        document.querySelectorAll('.year-buttons').forEach(el => el.style.display = 'block');
        document.getElementById('year-selector').style.display = 'block';
    }
});

async function fetchGeoData() {
    const urlGeoJson = 'https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326';
    try {
        const response = await fetch(urlGeoJson);
        geoData = await response.json();
    } catch (error) {
        console.error("Error fetching geo data: ", error);
    }
}

async function fetchAllElectionData() {
    const urlElections = 'https://pxdata.stat.fi:443/PxWeb/api/v1/en/StatFin/kvaa/statfin_kvaa_pxt_12g3.px';
    try {
        const response = await fetch(urlElections, {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(jsonQueryElections)
        });
        const electionsData = await response.json();
        allElectionData = processElectionsData(electionsData);
    } catch (error) {
        console.error("Error fetching election data: ", error);
    }
}

async function fetchMigrationData() {
    const urlMigrations = 'https://pxdata.stat.fi:443/PxWeb/api/v1/en/StatFin/muutl/statfin_muutl_pxt_11a1.px';

    const jsonQueryNegativeMigration = JSON.parse(JSON.stringify(jsonQueryMigrations));
    jsonQueryNegativeMigration.query[0].code = 'Lähtöalue';

    try {
        const [positiveMigrationResponse, negativeMigrationResponse] = await Promise.all([
            fetch(urlMigrations, {
                method: 'POST',
                headers: { "content-type": "application/json" },
                body: JSON.stringify(jsonQueryMigrations) // for positive migration
            }),
            fetch(urlMigrations, {
                method: 'POST',
                headers: { "content-type": "application/json" },
                body: JSON.stringify(jsonQueryNegativeMigration) // for negative migration
            })
        ]);

        // parsing JSON from responses
        const positiveMigrationData = await positiveMigrationResponse.json();
        const negativeMigrationData = await negativeMigrationResponse.json();

        positiveMigrationsData = processMigrationData(positiveMigrationData, 'Tuloalue');
        negativeMigrationsData = processMigrationData(negativeMigrationData, 'Lähtöalue');

        console.log(positiveMigrationsData);

    } catch (error) {
        console.log("Error happened while fetching: ", error);
    }
}

const processMigrationData = (data, type) => {
    const municipalities = data.dimension[type].category.label;
    const years = data.dimension.Vuosi.category.label;
    const values = data.value;
    const migrations = {};

    const yearKeys = Object.keys(years);
    const numYears = yearKeys.length;

    // iterating through each municipality
    Object.keys(municipalities).forEach((key, index) => {
        let municipalityName = municipalities[key];

        if (municipalityName === "WHOLE COUNTRY") {
            municipalityName = "Mainland Finland";
        } else {
            municipalityName = municipalityName.replace(type === 'Tuloalue' ? "Arrival - " : "Departure - ", "");
        }
        const yearlyData = {};

        // calculating the starting index for this municipality
        const startIdx = index * numYears;
        for (let i = 0; i < numYears; i++) {
            const year = yearKeys[i];
            yearlyData[year] = values[startIdx + i];
        }
        migrations[municipalityName] = yearlyData;
    });

    return migrations;
};

const processElectionsData = (data) => {
    const municipalities = data.dimension['Alue'].category.label;
    const parties = ['Total', 'KOK', 'SDP', 'KESK', 'PS', 'VIHR', 'VAS', 'RKP', 'KD'];
    const years = data.dimension['Vuosi'].category.label;
    const electionValues = data.value;

    // array of municipality keys, mapped to an object that keeps both original string and numeric representation
    const municipalityKeys = Object.keys(municipalities).map(key => ({
        originalKey: key,
        numericKey: parseInt(key),
    }));

    // sorted municipalities by their numeric key representation
    municipalityKeys.sort((a, b) => a.numericKey - b.numericKey);

    const results = {};
    const numParties = parties.length;

    // sorted municipalities
    municipalityKeys.forEach(({ originalKey, numericKey }, municipalityIndex) => {
        const municipalityLabel = municipalities[originalKey];
        const cleanMunicipalityLabel = municipalityLabel === 'Mainland Finland' ? municipalityLabel : municipalityLabel.substring(4); // Removing the first four characters (city coding)

        const municipalityResults = {};
        results[cleanMunicipalityLabel] = municipalityResults;

        // for each year
        Object.values(years).forEach((year, yearIndex) => {
            const yearResults = {};
            municipalityResults[year] = yearResults;

            // for each party
            parties.forEach((party, partyIndex) => {
                // the index in the values array that corresponds to the party value for a specific municipality and a year
                const indexOffset = yearIndex * municipalityKeys.length * numParties;
                const valueIndex = indexOffset + municipalityIndex * numParties + partyIndex;

                yearResults[party] = electionValues[valueIndex];
            });
        });
    });
    console.log(results);
    return results;
};

function updateMapForYear(year) {
    createMap(geoData, allElectionData, year);
}

function createMap(data, electionsInfo) {
    if (!data) {
        return;
    }

    if (geoJson) {
        geoJson.remove();
    }

    geoJson = L.geoJSON(data, {
        onEachFeature: (feature, layer) => getCustomFeature(feature, layer),
        style: (feature) => {
            const municipalityName = feature.properties.name;
            const municipalityResults = electionsInfo[municipalityName];

            if (municipalityResults) {
                const color = getWinningPartyColor(municipalityResults, selectedYear);
                return { color: color, fillColor: color, fillOpacity: 0.7, weight: 2 };
            }
            return { color: '#808080', fillColor: '#808080', fillOpacity: 0.7, weight: 2 };
        }
    }).addTo(map);

    map.fitBounds(geoJson.getBounds());
}

const getCustomFeature = (feature, layer) => {
    if (!feature.properties.name) {
        return;
    }

    const municipalityName = feature.properties.name;
    layer.bindTooltip(municipalityName);

    if (municipalityHasData(municipalityName)) {
        layer.on('click', function () {
            displayMunicipalityData(municipalityName);

            const newUrlPath = '?municipality=' + encodeURIComponent(municipalityName);
            history.pushState({ municipality: municipalityName }, "", newUrlPath);
        });
    } else {
        layer.on('mouseover', function () {
            this._path.style.cursor = 'not-allowed';
        });

        layer.on('click', function (e) {
            const tooltip = L.tooltip()
                .setContent('No data to be shown')
                .setLatLng(e.latlng)
                .addTo(map);

            this.bindTooltip(tooltip);
        });

        layer.on('mouseout', function () {
            this.bindTooltip(municipalityName);
        });
    }
};

function municipalityHasData(municipalityName) {
    const dataForMunicipality = allElectionData[municipalityName];
    return dataForMunicipality && Object.keys(dataForMunicipality).length > 0;
}

const getWinningPartyColor = (municipalityResults, year) => {
    const results2021 = municipalityResults[year];
    let highestPercentage = 0;
    let winningParty = '';
    let knownPartiesTotalVotes = 0;  // sum of votes for known parties

    // total votes for known parties
    for (const [party, votes] of Object.entries(results2021)) {
        if (party !== 'Total') {
            knownPartiesTotalVotes += votes;
        }
    }

    // votes categorized under "Others"
    const otherVotes = results2021['Total'] - knownPartiesTotalVotes;
    const otherPercentage = (otherVotes / results2021['Total']) * 100;

    // finding the winning party or if "Others" have the highest percentage
    for (const [party, votes] of Object.entries(results2021)) {
        if (party === 'Total') continue; // skiping the 'Total' entry.

        const votePercentage = (votes / results2021['Total']) * 100;

        if (votePercentage > highestPercentage) {
            highestPercentage = votePercentage;
            winningParty = party;
        }
    }

    if (otherPercentage > highestPercentage) {
        winningParty = 'Others';
    }

    if (winningParty === '') return '#808080'; // no data available

    return partiesInfo[winningParty].color;
};

function createMainlandFinlandResultsControl() {
    // info panel for whole finland election results
    const ElectionResultsControl = L.Control.extend({
        options: {
            position: 'topright'
        },

        onAdd: function (map) {
            const container = L.DomUtil.create('div', 'election-results-control');
            Object.assign(container.style, {
                backgroundColor: '#f9f9f9',
                width: '150px',
                height: '300px',
                padding: '5px 10px',
                border: '1px solid',
                borderRadius: '5px',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                color: '#333',
                fontSize: '12px',
                overflow: 'hidden',
            });

            const header = document.createElement('div');
            header.id = 'results-header';
            header.textContent = `Finland Results for ${selectedYear}`;
            header.style.fontWeight = 'bold';
            container.appendChild(header);

            const resultsContainer = document.createElement('div');
            resultsContainer.id = 'mainland-finland-results';
            container.appendChild(resultsContainer);

            return container;
        }
    });

    return new ElectionResultsControl();
}

function updateMainlandFinlandResults() {
    const mainlandResults = allElectionData['Mainland Finland'][selectedYear];
    let totalVotes = 0;
    const partyResults = {};

    for (const party in mainlandResults) {
        if (party !== 'Total') {
            const votes = mainlandResults[party];
            totalVotes += votes;
            partyResults[party] = votes;
        }
    }

    const header = document.getElementById('results-header');
    if (header) {
        header.textContent = `Finland Results for ${selectedYear}`;
    }

    let contentHTML = '<div style="margin-top: 5px;">';
    for (const party in partyResults) {
        const percentage = ((partyResults[party] / totalVotes) * 100).toFixed(2);
        contentHTML += `
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ddd; padding: 2px 0;">
                <span><strong>${party}</strong></span>
                <span>${percentage}%</span>
            </div>`;
    }
    contentHTML += '</div>';
    contentHTML += '<div id="mini-pie-chart" style="height: 100px; width: 150px;"></div>'; // smaller pie chart

    const resultsContainer = document.getElementById('mainland-finland-results');
    if (resultsContainer) {
        resultsContainer.innerHTML = contentHTML;

        createPieChart('mini-pie-chart', 'Mainland Finland');
    }
}

function createMapLegend() {
    const legendContainer = document.getElementById('map-legend');

    const legendTitle = document.createElement('div');
    legendTitle.innerHTML = '<strong>Party Colors</strong>';
    legendContainer.appendChild(legendTitle);

    const divider = document.createElement('div');
    divider.className = 'map-legend-divider';
    legendContainer.appendChild(divider);

    for (const [party, partyInfo] of Object.entries(partiesInfo)) {
        const legendKey = document.createElement('div');
        legendKey.className = 'map-legend-key';

        const colorBox = document.createElement('div');
        colorBox.style.backgroundColor = partyInfo.color;
        colorBox.className = 'map-legend-color';

        legendKey.appendChild(colorBox);

        if (party === 'Others' || party === 'No data') {
            const partyName = document.createElement('span');
            partyName.textContent = party;
            legendKey.appendChild(partyName);
        } else {
            const partyLink = document.createElement('a');
            partyLink.href = partyInfo.wikiLink;
            partyLink.textContent = party;
            partyLink.target = '_blank'; // open in a new tab
            const linkIcon = document.createElement('i');
            linkIcon.className = 'fas fa-external-link-alt';

            // appending the text and the icon to the link element
            partyLink.appendChild(linkIcon);
            legendKey.appendChild(partyLink);
        }

        legendContainer.appendChild(legendKey);
    }
}

function createFlagControl() {
    // creating finnish flag on the map
    const FlagControl = L.Control.extend({
        options: {
            position: 'bottomleft'
        },

        onAdd: function (map) {
            const container = L.DomUtil.create('div', 'flag-icon');
            const img = L.DomUtil.create('img', '', container);
            img.src = './images/Flag_of_Finland.svg';
            img.style.width = '100px';
            img.style.height = '75px';
            img.style.paddingBottom = '85%';

            L.DomEvent.disableClickPropagation(container);
            L.DomEvent.disableScrollPropagation(container);

            return container;
        }
    });
    return new FlagControl();
}

function displayMunicipalityData(municipalityName) {
    // hiding map and other elements
    document.getElementById('map').style.display = 'none';
    document.getElementById('map-legend').style.display = 'none';
    document.querySelectorAll('.year-buttons').forEach(el => el.style.display = 'none');
    document.getElementById('year-selector').style.display = 'none';

    // main container for charts and clearing any previous content
    const chartsContainer = document.getElementById('charts');
    chartsContainer.innerHTML = '';

    const pieChartContainer = document.createElement('div');
    pieChartContainer.id = 'pie-chart-container';
    chartsContainer.appendChild(pieChartContainer);

    const barChartContainer = document.createElement('div');
    barChartContainer.id = 'bar-chart-container';
    chartsContainer.appendChild(barChartContainer);

    const timeSeriesChartContainer = document.createElement('div');
    timeSeriesChartContainer.id = 'time-series-chart-container';
    chartsContainer.appendChild(timeSeriesChartContainer);

    const stackedAreaChartContainer = document.createElement('div');
    stackedAreaChartContainer.id = 'stacked-area-chart-container';
    chartsContainer.appendChild(stackedAreaChartContainer);

    const migrationChartContainer = document.createElement('div');
    migrationChartContainer.id = 'migration-chart-container';
    chartsContainer.appendChild(migrationChartContainer);

    const combinedChartContainer = document.createElement('div');
    combinedChartContainer.id = 'combined-chart-container';
    chartsContainer.appendChild(combinedChartContainer);

    // displaying the charts
    createPieChart(pieChartContainer, municipalityName);
    createBarChart(barChartContainer, municipalityName);
    createTimeSeriesChart(timeSeriesChartContainer, municipalityName);
    createStackedAreaChart(stackedAreaChartContainer, municipalityName);
    createMigrationChart(migrationChartContainer, municipalityName);
    createCombinedChart(combinedChartContainer, municipalityName);

    // main container and back button visible
    chartsContainer.style.display = 'block';
    const backButton = document.getElementById('back-button');
    backButton.style.display = 'block';
}

function createPieChart(container, municipalityName) {
    const municipalityData = allElectionData[municipalityName][selectedYear];
    const data = [];

    Object.entries(municipalityData).forEach(([party, voteCount]) => {
        if (party !== 'Total') {
            data.push({
                name: party,
                y: voteCount,
                color: partiesInfo[party].color,
            });
        }
    });

    Highcharts.chart(container, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: container === 'mini-pie-chart' ? 90 : null,
        },
        title: {
            text: container === 'mini-pie-chart' ? "" : `Election Results for ${municipalityName}`
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: container === 'mini-pie-chart' ? false : true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            name: 'Share',
            data: data
        }]
    });
}

function createBarChart(container, municipalityName) {
    const municipalityData = allElectionData[municipalityName][selectedYear];
    const categories = [];
    const data = [];

    Object.entries(municipalityData).forEach(([party, voteCount]) => {
        if (party !== 'Total') {
            categories.push(party);
            data.push({
                name: party,
                y: voteCount,
                color: partiesInfo[party].color,
            });
        }
    });

    Highcharts.chart(container, {
        chart: {
            type: 'bar'
        },
        title: {
            text: ""
        },
        xAxis: {
            categories: categories,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Votes',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Votes',
            data: data
        }]
    });
}

function createTimeSeriesChart(container, municipalityName) {
    const municipalityData = allElectionData[municipalityName];

    const categories = Object.keys(municipalityData).sort();
    const series = [];
    const firstYearParties = Object.keys(municipalityData[categories[0]]);
    const parties = firstYearParties.filter(party => party !== 'Total'); // excluding 'Total'

    parties.forEach(party => {
        const data = categories.map(year => {
            const totalVotes = municipalityData[year]['Total'] || 1;
            const partyVotes = municipalityData[year][party] || 0; // returning vote count or 0 if no data exists
            const percentage = (partyVotes / totalVotes * 100).toFixed(2);

            return {
                y: partyVotes,
                percentage: percentage
            };
        });

        series.push({
            name: party,
            data: data,
            color: partiesInfo[party].color,
        });
    });

    Highcharts.chart(container, {
        chart: {
            type: 'line'
        },
        title: {
            text: `Voting Trends in ${municipalityName}`
        },
        xAxis: {
            categories: categories,
            crosshair: true,
            title: {
                text: 'Year'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of Votes'
            },
            labels: {
                format: '{value}'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} votes ({point.percentage}%)</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return `${this.y} (${this.point.percentage}%)`;
                    }
                },
                enableMouseTracking: true
            }
        },
        series: series
    });
}

function createStackedAreaChart(container, municipalityName) {
    const municipalityData = allElectionData[municipalityName];

    const categories = Object.keys(municipalityData).sort();
    const series = [];

    const firstYearParties = Object.keys(municipalityData[categories[0]]);
    const parties = firstYearParties.filter(party => party !== 'Total'); // excluding 'Total'

    parties.forEach(party => {
        const data = categories.map(year => {
            const partyVotes = municipalityData[year][party] || 0; // returning vote count or 0 if no data exists
            return partyVotes;
        });

        series.push({
            name: party,
            data: data,
            color: partiesInfo[party].color,
        });
    });

    Highcharts.chart(container, {
        chart: {
            type: 'area',
            zoomType: 'x',
        },
        title: {
            text: `Party Vote Proportions in ${municipalityName}`
        },
        xAxis: {
            categories: categories,
            tickmarkPlacement: 'on',
            title: {
                text: 'Year'
            }
        },
        yAxis: {
            title: {
                text: 'Number of Votes'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'gray'
                }
            }
        },
        tooltip: {
            split: true,
            valueSuffix: ' votes'
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#ffffff',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#ffffff'
                }
            }
        },
        series: series
    });
}

function createMigrationChart(container, municipalityName) {
    // extracting the migration data for the specified municipality
    const years = Object.keys(positiveMigrationsData[municipalityName]);
    const positiveData = years.map(year => positiveMigrationsData[municipalityName][year]);
    const negativeData = years.map(year => negativeMigrationsData[municipalityName][year]);

    Highcharts.chart(container, {
        chart: {
            type: 'line'
        },
        title: {
            text: `Migration Trends in ${municipalityName}`
        },
        xAxis: {
            categories: years,
            title: {
                text: 'Year'
            }
        },
        yAxis: {
            title: {
                text: 'Number of Migrants'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true
            }
        },
        series: [{
            name: 'Positive Migration',
            data: positiveData,
            color: 'green'
        }, {
            name: 'Negative Migration',
            data: negativeData,
            color: 'red'
        }],
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x}: {point.y}'
        }
    });
}

function createCombinedChart(container, municipalityName) {
    // municipality data
    const municipalityData = allElectionData[municipalityName];
    const categories = Object.keys(municipalityData).sort();
    const series = [];

    const firstYearParties = Object.keys(municipalityData[categories[0]]);
    const parties = firstYearParties.filter(party => party !== 'Total'); // excluding 'Total'

    parties.forEach(party => {
        const data = categories.map(year => {
            const totalVotes = municipalityData[year]['Total'] || 1;
            const partyVotes = municipalityData[year][party] || 0;
            const percentage = (partyVotes / totalVotes * 100).toFixed(2);

            return {
                y: partyVotes,
                percentage: percentage
            };
        });

        series.push({
            type: 'column', // representing votes as columns
            name: party,
            data: data,
            color: partiesInfo[party].color,
        });
    });

    // migration data
    const migrationYears = Object.keys(positiveMigrationsData[municipalityName]);
    const positiveData = migrationYears.map(year => positiveMigrationsData[municipalityName][year]);
    const negativeData = migrationYears.map(year => negativeMigrationsData[municipalityName][year]);

    series.push({
        type: 'line', // representing migrations as lines
        name: 'Positive Migration',
        data: positiveData,
        marker: {
            enabled: true
        },
        color: 'green',
        yAxis: 1
    }, {
        type: 'line',
        name: 'Negative Migration',
        data: negativeData,
        marker: {
            enabled: true
        },
        color: 'red',
        yAxis: 1
    });

    Highcharts.chart(container, {
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: `Election and Migration Trends in ${municipalityName}`
        },
        xAxis: [{
            categories: categories,
            crosshair: true
        }],
        yAxis: [{
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'Number of Votes',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, {
            title: {
                text: 'Number of Migrants',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        series: series
    });
}
