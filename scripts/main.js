// Referencing: week 5, week 6, and week 7 source codes in the lecture notes
// Referencing: https://pxdata.stat.fi/PxWeb/pxweb/en/StatFin/StatFin__kvaa/statfin_kvaa_pxt_12g3.px/
// Referencing: https://vaalit.yle.fi/kv2021/fi/
// Referencing: https://gisgeography.com/map-legend/
// Referencing: https://www.highcharts.com/demo
// Referencing: https://commons.wikimedia.org/wiki/File:Flag_of_Finland.svg
// Referencing: https://medium.com/analytics-vidhya/python-code-on-holt-winters-forecasting-3843808a9873
// Referencing: https://blog.logrocket.com/export-react-components-as-images-html2canvas/#:~:text=html2canvas%20is%20a%20JavaScript%20library,is%20present%20on%20the%20page.

// ### GLOBAL VARIABLES STARTS ###
const urlJsonQueryElections = '../jsonQueries/electionQuery.json';
const urlJsonQueryMigrations = '../jsonQueries/migrationQuery.json';

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
const partyLogos = ['./assets/images/Nationale_Sammlungspartei_(Finnland)_logo.png', './assets/images/Sozialdemokratische_Partei_Finnlands_Logo.png', './assets/images/Keskusta.png', './assets/images/Perussuomalaiset_Logo.png', './assets/images/Vihreät.png', './assets/images/Vasemmistoliitto_Logo_2018.png', "./assets/images/Swedish_People's_Party_of_Finland_logo.png", './assets/images/Christian_Democrats_(Finland)_logo_2022.png']

let map;
let geoJson;
let geoData;
let allElectionData;
let positiveMigrationsData;
let negativeMigrationsData;

let selectedYear = '2021';
const upcomingElections = [2025, 2029];
let currentPredictionIndex = 0;
// ### GLOBAL VARIABLES ENDS ###


// ### INITIAL CONTENT LOAD/UPDATE STARTS ###
document.addEventListener('DOMContentLoaded', async (event) => {
    map = L.map('map', {
        maxZoom: 7,
        minZoom: 4.5,
        preferCanvas: true
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap"
    }).addTo(map);

    // fetching necessary data
    await fetchGeoData();
    await fetchAllElectionData();
    await fetchMigrationData();
    createMap(geoData, allElectionData);
    createMapLegend();
    map.addControl(createMainlandFinlandResultsControl());
    map.addControl(createMapHeaderControl());
    updateMainlandFinlandResults()
    const flagControl = createFlagControl();
    flagControl.addTo(map);

    const yearButtons = document.querySelectorAll('.year-btn');
    yearButtons.forEach(button => {
        button.addEventListener('click', function () {
            selectedYear = this.getAttribute('data-year');
            createMap(geoData, allElectionData); // changing the elections data and re-creating the map
            updateMainlandFinlandResults()
        });
    });

    document.getElementById('download-map').addEventListener('click', function () {
        downloadMap();
    });

    document.getElementById('download-charts').addEventListener('click', function () {
        downloadCharts();
    });

    document.getElementById('predict-button').addEventListener('click', function () {
        if (currentPredictionIndex < upcomingElections.length) {
            const yearToPredict = upcomingElections[currentPredictionIndex];
            predictNextElection(yearToPredict);
            currentPredictionIndex++;
            if (currentPredictionIndex === upcomingElections.length) {
                this.style.display = 'none';
            }
        }
    });

    document.getElementById('back-button').addEventListener('click', function () {
        // hiding charts and buttons
        document.getElementById('charts').style.display = 'none';
        this.style.display = 'none';
        document.getElementById('download-charts').style.display = 'none';

        // showing the map and other elements again
        document.getElementById('map').style.display = 'block';
        document.getElementById('map-legend').style.display = 'block';
        document.querySelectorAll('.year-buttons').forEach(el => el.style.display = 'block');
        document.getElementById('year-selector').style.display = 'block';
        document.getElementById('download-map').style.display = 'block';

        if (history.state && history.state.municipality) {
            history.back(); // reverting to previous state
        } else {
            // cleaning up the URL to its base form without any query parameters
            const originalLocation = location.protocol + '//' + location.host + location.pathname;
            history.replaceState(null, "", originalLocation); // replacing the current history entry with the original location
        }
    });
});

self.addEventListener('popstate', function (event) {
    if (event.state && event.state.municipality) {
        history.back();
    } else {
        // hiding charts and buttons
        document.getElementById('charts').style.display = 'none';
        document.getElementById('back-button').style.display = 'none';
        document.getElementById('download-charts').style.display = 'none';

        // showing the map and other elements again
        document.getElementById('map').style.display = 'block';
        document.getElementById('map-legend').style.display = 'block';
        document.querySelectorAll('.year-buttons').forEach(el => el.style.display = 'block');
        document.getElementById('year-selector').style.display = 'block';
        document.getElementById('download-map').style.display = 'block';
    }
});
// ### INITIAL CONTENT LOAD/UPDATE ENDS ###


// ### FETCH DATA STARTS ###
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

    const responseQuery = await fetch(urlJsonQueryElections);
    const jsonQueryElections = await responseQuery.json();

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

    const responseQuery = await fetch(urlJsonQueryMigrations);
    const jsonQueryMigrations = await responseQuery.json();

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

    } catch (error) {
        console.log("Error happened while fetching: ", error);
    }
}
// ### FETCH DATA ENDS ###


// ### PROCESS FETCHED DATA STARTS ###
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
        const cleanMunicipalityLabel = municipalityLabel === 'Mainland Finland' ? municipalityLabel : municipalityLabel.substring(4); // removing the first four characters (city coding)

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
    return results;
};
// ### PROCESS FETCHED DATA ENDS ###


// ### CREATE MAP STARTS ###
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
        layer.on('mouseover', function (e) {
            e.originalEvent.target.style.cursor = 'not-allowed';
        });

        layer.on('click', function (e) {
            const tooltip = L.tooltip()
                .setContent('No data to be shown')
                .setLatLng(e.latlng)
                .addTo(map);

            this.bindTooltip(tooltip);
        });

        layer.on('mouseout', function (e) {
            e.originalEvent.target.style.cursor = '';
            this.bindTooltip(municipalityName);
        });
    }
};

function municipalityHasData(municipalityName) {
    const dataForMunicipality = allElectionData[municipalityName];
    return dataForMunicipality && Object.keys(dataForMunicipality).length > 0;
}

const getWinningPartyColor = (municipalityResults, year) => {
    const results = municipalityResults[year];
    let highestPercentage = 0;
    let winningParty = '';
    let knownPartiesTotalVotes = 0;  // sum of votes for known parties

    // total votes for known parties
    for (const [party, votes] of Object.entries(results)) {
        if (party !== 'Total') {
            knownPartiesTotalVotes += votes;
        }
    }

    // votes categorized under "Others"
    const otherVotes = results['Total'] - knownPartiesTotalVotes;
    const otherPercentage = (otherVotes / results['Total']) * 100;

    // finding the winning party or if "Others" have the highest percentage
    for (const [party, votes] of Object.entries(results)) {
        if (party === 'Total') continue; // skiping the 'Total' entry.

        const votePercentage = (votes / results['Total']) * 100;

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
// ### CREATE MAP ENDS ###


// ### PREDICT NEXT ELECTIONS STARTS ###
function predictNextElection(yearToPredict) {
    updateElectionDataWithPrediction(yearToPredict);

    const newButton = document.createElement("button");
    newButton.innerHTML = `${yearToPredict}`;
    newButton.classList.add("year-btn", "new-predicted-btn");
    newButton.setAttribute("data-year", yearToPredict);

    newButton.addEventListener('click', function () {
        selectedYear = this.getAttribute('data-year');
        createMap(geoData, allElectionData);  // changing the elections data and re-creating the map
        updateMainlandFinlandResults();
    });

    document.querySelector(".year-buttons").appendChild(newButton);
}

function predictElectionBasedOnPreviousData(electionData, yearToPredict) {
    // for this prediction, Holt's linear trend method will me applied
    // for sure this is not so correct prediction but was interesting to implement
    const predictionResults = {};

    for (const municipality in electionData) {
        predictionResults[municipality] = predictionResults[municipality] || {};

        const history = electionData[municipality];
        const years = Object.keys(history).map(Number);
        years.sort((a, b) => a - b);

        const numberOfElections = years.length;

        const level = {};
        const trend = {};
        const initialTrendPeriod = 3; // every last three elections

        // alpha is for the level component, and beta is for the trend component
        const alpha = 0.5;
        const beta = 0.3;

        for (let i = 0; i < numberOfElections; i++) {
            const year = years[i];
            const yearData = history[year];

            for (const party in yearData) {
                if (party !== 'Total') {
                    if (!level[party]) {
                        // initializing level and trend
                        level[party] = yearData[party];
                        trend[party] = (i >= initialTrendPeriod) ? (yearData[party] - history[years[i - initialTrendPeriod]][party]) / initialTrendPeriod : 0;
                    } else {
                        // updating level and trend with Holt's method
                        const prevLevel = level[party];
                        level[party] = alpha * yearData[party] + (1 - alpha) * (prevLevel + trend[party]);
                        trend[party] = beta * (level[party] - prevLevel) + (1 - beta) * trend[party];
                    }
                }
            }
        }

        const predictedYearData = { Total: 0 };
        const yearsIntoFuture = yearToPredict - years[years.length - 1];
        let sumPredictedVotes = 0;

        // creating predictions for the next year based on level and trend components
        for (const party in level) {
             // Holt's method prediction for future points
            const prediction = Math.round(level[party] + yearsIntoFuture * trend[party]);
            predictedYearData[party] = prediction > 0 ? prediction : 0; // avoiding negative predictions
            sumPredictedVotes += predictedYearData[party];
        }

        const othersVotes = history[years[years.length - 1]]['Total'] - sumPredictedVotes;
        let remainingVotes = othersVotes;

        // considering Others proportion
        for (const party in level) {
            if (remainingVotes <= 0) {
                break;
            }
            const proportion = predictedYearData[party] / sumPredictedVotes;
            const votesToDeduct = Math.floor(othersVotes * proportion);
            const newVoteCount = predictedYearData[party] - votesToDeduct;

            predictedYearData[party] = newVoteCount >= 0 ? newVoteCount : 0;
            remainingVotes -= votesToDeduct;
        }

        if (remainingVotes > 0) {
            const partiesSorted = Object.keys(level).sort((a, b) => predictedYearData[b] - predictedYearData[a]);
            for (const party of partiesSorted) {
                if (remainingVotes <= 0) {
                    break;
                }
                if (predictedYearData[party] > 0) {
                    predictedYearData[party] -= 1;
                    remainingVotes--;
                }
            }
        }

        predictedYearData['Total'] = sumPredictedVotes - othersVotes;
        if (predictedYearData['Total'] < 0) {
            predictedYearData['Total'] = 0;
        }

        predictionResults[municipality][yearToPredict] = predictedYearData;
    }

    return predictionResults;
}

function updateElectionDataWithPrediction(predictedYear) {
    const newPredictions = predictElectionBasedOnPreviousData(allElectionData, predictedYear);

    for (const municipality in newPredictions) {
        allElectionData[municipality][predictedYear] = newPredictions[municipality][predictedYear];
    }
}
// ### PREDICT NEXT ELECTIONS ENDS ###


// ### CREATE MAP LEGENDS STARTS ###
function createMapHeaderControl() {
    const MapHeaderControl = L.Control.extend({
        options: {
            position: 'topleft' // default position, we will override this with CSS
        },

        onAdd: function (map) {
            const container = L.DomUtil.create('div', 'map-header-control');
            Object.assign(container.style, {
                backgroundColor: 'rgba(0, 68, 156, 0.8)',
                color: 'white',
                padding: '5px 10px',
                fontWeight: 'bold',
                textAlign: 'center',
                borderRadius: '3px',
                width: '40%',
            });

            container.textContent = 'MUNICIPALITY ELECTIONS';
            L.DomEvent.disableClickPropagation(container);

            return container;
        }
    });

    return new MapHeaderControl();
}

function createMainlandFinlandResultsControl() {
    // info panel for whole finland election results
    const ElectionResultsControl = L.Control.extend({
        options: {
            position: 'topright'
        },

        onAdd: function (map) {
            const parentContainer = L.DomUtil.create('div', 'parent-election-results-control');
            const container = L.DomUtil.create('div', 'election-results-control');
            Object.assign(container.style, {
                backgroundColor: '#f9f9f9',
                width: '250px',
                height: '350px',
                padding: '5px 10px',
                border: '1px solid',
                borderRadius: '5px',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                color: '#333',
                fontSize: '14px',
                overflow: 'hidden'
            });

            const header = document.createElement('div');
            header.id = 'results-header';
            header.textContent = `Finland Results for ${selectedYear}`;
            header.style.fontWeight = 'bold';
            container.appendChild(header);

            const resultsContainer = document.createElement('div');
            resultsContainer.id = 'mainland-finland-results';
            container.appendChild(resultsContainer);

            const downloadBtn = document.createElement('button');
            downloadBtn.id = 'download-map';
            downloadBtn.innerText = 'Download Map';

            parentContainer.appendChild(container);
            parentContainer.appendChild(downloadBtn);

            return parentContainer;
        }
    });

    return new ElectionResultsControl();
}

function updateMainlandFinlandResults() {
    const mainlandResults = allElectionData['Mainland Finland'][selectedYear];
    let knownPartiesTotalVotes = 0;
    const partyResults = {};

    for (const party in mainlandResults) {
        if (party !== 'Total') {
            const votes = mainlandResults[party];
            knownPartiesTotalVotes += votes;
            partyResults[party] = votes;
        }
    }

    // calculating the "Others" votes
    const totalVotes = mainlandResults['Total'] || knownPartiesTotalVotes;
    const othersVotes = totalVotes - knownPartiesTotalVotes;
    partyResults['Others'] = othersVotes;

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
    contentHTML += '<div id="mini-pie-chart" style="height: 100px; width: 250px;"></div>'; // smaller pie chart

    const resultsContainer = document.getElementById('mainland-finland-results');
    if (resultsContainer) {
        resultsContainer.innerHTML = contentHTML;

        createPieChart('mini-pie-chart', 'Mainland Finland', partyResults);
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
            img.src = './assets/images/Flag_of_Finland.svg';
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
// ### CREATE MAP LEGENDS ENDS ###


// ### DISPLAY MUNICIPALITY DATA STARTS ###
function displayMunicipalityData(municipalityName) {
    // hiding map and other elements
    document.getElementById('map').style.display = 'none';
    document.getElementById('map-legend').style.display = 'none';
    document.querySelectorAll('.year-buttons').forEach(el => el.style.display = 'none');
    document.getElementById('year-selector').style.display = 'none';
    document.getElementById('download-map').style.display = 'none';

    // main container for charts and clearing any previous content
    const chartsContainer = document.getElementById('charts');
    chartsContainer.innerHTML = '';

    const rainCanvas = document.createElement('canvas');
    rainCanvas.id = 'rain-canvas';
    rainCanvas.width = chartsContainer.offsetWidth;
    rainCanvas.height = chartsContainer.offsetHeight;
    rainCanvas.style.position = 'fixed';
    rainCanvas.style.top = '0';
    rainCanvas.style.left = '0';
    rainCanvas.style.zIndex = '1';
    rainCanvas.style.backgroundColor = 'black';
    chartsContainer.appendChild(rainCanvas);

    initializeRainingEffect(rainCanvas.id);

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
    document.getElementById('back-button').style.display = 'block';
    document.getElementById('download-charts').style.display = 'block';
}
// ### DISPLAY MUNICIPALITY DATA ENDS ###


// ### CREATE DYNAMIC RAIN STARTS ###
function initializeRainingEffect(canvasId) {
    // mostly from the matrix rain tutorial in week 7
    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext("2d");

    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    let animationFrameId = null;

    function setCanvasSize() {
        // covering the full page
        canvasWidth = document.documentElement.clientWidth;
        canvasHeight = document.documentElement.scrollHeight;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
    }

    function throttledSetCanvasSize() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(setCanvasSize, 250);
    }

    setCanvasSize();

    self.addEventListener('resize', throttledSetCanvasSize, false);

    const numLogos = 20;
    const logos = [];
    const fixedFallSpeed = 0.6;
    const scale = 0.1;

    for (let i = 0; i < numLogos; i++) {
        const logo = new Image();
        logo.src = partyLogos[i % partyLogos.length];
        logo.onload = () => {
            logos.push({
                image: logo,
                x: Math.random() * canvasWidth,
                y: Math.random() * canvasHeight - canvasHeight,
                vy: fixedFallSpeed,
            });
            // starting the animation if it's the first logo
            if (logos.length === 1) {
                animationLoop();
            }
        };
    }

    function animationLoop() {
        // clearing the previous frame
        context.clearRect(0, 0, canvasWidth, canvasHeight);

        // drawing and updating each logo's position
        logos.forEach(logoObj => {
            context.drawImage(logoObj.image, logoObj.x, logoObj.y, logoObj.image.width * scale, logoObj.image.height * scale);

            logoObj.y += logoObj.vy;

            if (logoObj.y > canvasHeight) {
                logoObj.x = Math.random() * canvasWidth;
                logoObj.y = -logoObj.image.height * scale;
            }
        });

        // next frame
        animationFrameId = requestAnimationFrame(animationLoop);
    }

    function stopAnimation() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            stopAnimation(); // stoping the animation when the tab is not visible
        } else {
            animationLoop(); // restarting the animation when the tab becomes visible again
        }
    });
}
// ### CREATE DYNAMIC RAIN ENDS ###


// ### CREATE CHARTS STARTS ###
function createPieChart(container, municipalityName) {
    const municipalityData = allElectionData[municipalityName][selectedYear];
    let knownPartiesTotal = 0;
    const data = [];

    Object.entries(municipalityData).forEach(([party, voteCount]) => {
        if (party !== 'Total' && partiesInfo[party]) {
            knownPartiesTotal += voteCount;
            data.push({
                name: party,
                y: voteCount,
                color: partiesInfo[party].color,
            });
        }
    });

    const othersVoteCount = municipalityData['Total'] - knownPartiesTotal;

    data.push({
        name: 'Others',
        y: othersVoteCount,
        color: partiesInfo['Others'].color,
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
            text: container === 'mini-pie-chart' ? "" : `Election Results for ${municipalityName}, ${selectedYear}`
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

    let knownPartiesTotal = 0;
    Object.entries(municipalityData).forEach(([party, voteCount]) => {
        if (party !== 'Total' && partiesInfo[party]) {
            knownPartiesTotal += voteCount;
            categories.push(party);
            data.push({
                name: party,
                y: voteCount,
                color: partiesInfo[party].color,
            });
        }
    });

    const othersVoteCount = municipalityData['Total'] - knownPartiesTotal;
    categories.push('Others');
    data.push({
        name: 'Others',
        y: othersVoteCount,
        color: partiesInfo['Others'].color,
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

    const othersData = categories.map(year => {
        let knownPartiesTotal = 0;
        parties.forEach(party => {
            knownPartiesTotal += municipalityData[year][party] || 0; // returning vote count or 0 if no data exists
        });
        const totalVotes = municipalityData[year]['Total'] || 1;
        const othersVotes = totalVotes - knownPartiesTotal;
        const percentage = ((othersVotes / totalVotes) * 100).toFixed(2);
        return {
            y: othersVotes,
            percentage: percentage
        };
    });

    parties.forEach(party => {
        const data = categories.map(year => {
            const totalVotes = municipalityData[year]['Total'] || 1;
            const partyVotes = municipalityData[year][party] || 0; // returning vote count or 0 if no data exists
            const percentage = ((partyVotes / totalVotes) * 100).toFixed(2);

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

    series.push({
        name: 'Others',
        data: othersData,
        color: partiesInfo['Others'].color
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

    const othersData = categories.map(year => {
        let knownPartiesTotal = 0;
        parties.forEach(party => {
            knownPartiesTotal += municipalityData[year][party] || 0;
        });
        const totalVotes = municipalityData[year]['Total'] || 0;
        const othersVotes = totalVotes - knownPartiesTotal;
        return othersVotes;
    });

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

    series.push({
        name: 'Others',
        data: othersData,
        color: partiesInfo['Others'].color,
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

    const othersData = categories.map(year => {
        let knownPartiesTotal = 0;
        parties.forEach(party => {
            knownPartiesTotal += municipalityData[year][party] || 0;
        });
        const totalVotes = municipalityData[year]['Total'] || 0;
        const othersVotes = totalVotes - knownPartiesTotal;
        const percentage = ((othersVotes / totalVotes) * 100).toFixed(2);

        return {
            y: othersVotes,
            percentage: percentage
        };
    });

    // processing known parties
    parties.forEach(party => {
        const data = categories.map(year => {
            const totalVotes = municipalityData[year]['Total'] || 1;
            const partyVotes = municipalityData[year][party] || 0;
            const percentage = ((partyVotes / totalVotes) * 100).toFixed(2);

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

    series.push({
        type: 'column',
        name: 'Others',
        data: othersData,
        color: partiesInfo['Others'].color,
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
        yAxis: [{ // first y-axis for the election data
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
        }, { // second y-axis for the migration data
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
// ### CREATE CHARTS ENDS ###


// ### DOWNLOAD MAP/CHARTS STARTS ###
function downloadMap() {
    const mapContent = document.getElementById('map-content');
    html2canvas(mapContent, { useCORS: true }).then(function (canvas) {
        const link = document.createElement('a');
        link.download = `election_results_${selectedYear}.png`;
        link.href = canvas.toDataURL();
        link.click();
        link.remove();
    });
}

function downloadCharts() {
    const chartContent = document.getElementById('chart-content');
    html2canvas(chartContent, { useCORS: true }).then(function (canvas) {
        const link = document.createElement('a');
        link.download = `charts_for_${history.state.municipality}.png`;
        link.href = canvas.toDataURL();
        link.click();
        link.remove();
    });
}
// ### DOWNLOAD MAP/CHARTS ENDS ###
