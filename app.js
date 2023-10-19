// Referencing: week 5 and week 6 source codes in the lecture notes
// Referencing: https://pxdata.stat.fi/PxWeb/pxweb/en/StatFin/StatFin__kvaa/statfin_kvaa_pxt_12g3.px/
// Referencing: https://vaalit.yle.fi/kv2021/fi/
// Referencing: https://gisgeography.com/map-legend/
// Referencing: https://www.highcharts.com/blog/tutorials/the-optimal-way-to-visualize-the-composition-of-any-political-or-legislative-body/
// Referencing: https://commons.wikimedia.org/wiki/File:Flag_of_Finland.svg

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

document.addEventListener('DOMContentLoaded', async (event) => {
    map = L.map('map', { minZoom: -3 });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap"
    }).addTo(map);

    // Fetch necessary data
    await fetchGeoData();
    await fetchAllElectionData();
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
            updateMapForYear(selectedYear); // Change the elections data and re-create the map
            updateMainlandFinlandResults()
        });
    });

    // Back button event listener
    document.getElementById('back-button').addEventListener('click', function () {
        // Hide charts and 'Back' button
        document.getElementById('charts').style.display = 'none';
        this.style.display = 'none';

        // Show the map and other elements again
        document.getElementById('map').style.display = 'block';
        document.getElementById('map-legend').style.display = 'block';
        document.querySelectorAll('.year-buttons').forEach(el => el.style.display = 'block');
        document.getElementById('year-selector').style.display = 'block';

        if (history.state && history.state.municipality) {
            history.back(); // Revert to previous state
        } else {
            // Cleaning up the URL to its base form without any query parameters
            const originalLocation = location.protocol + '//' + location.host + location.pathname;
            history.replaceState(null, "", originalLocation); // Replaces the current history entry with the original location
        }
    });
});

self.addEventListener('popstate', function (event) {
    if (event.state && event.state.municipality) {
        history.back();
    } else {
        // Hiding charts and 'Back' button
        document.getElementById('charts').style.display = 'none';
        document.getElementById('back-button').style.display = 'none';

        // Showing the map and other elements again
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
            body: JSON.stringify(jsonQuery)
        });
        const electionsData = await response.json();
        allElectionData = processElectionsData(electionsData);
    } catch (error) {
        console.error("Error fetching election data: ", error);
    }
}

function updateMapForYear(year) {
    createMap(geoData, allElectionData, year);
}

const processElectionsData = (data) => {
    const municipalities = data.dimension['Alue'].category.label;
    const parties = ['Total', 'KOK', 'SDP', 'KESK', 'PS', 'VIHR', 'VAS', 'RKP', 'KD'];
    const years = data.dimension['Vuosi'].category.label;
    const electionValues = data.value;

    // Array of municipality keys, mapped to an object that keeps both original string and numeric representation
    const municipalityKeys = Object.keys(municipalities).map(key => ({
        originalKey: key,
        numericKey: parseInt(key),
    }));

    // Sorted municipalities by their numeric key representation
    municipalityKeys.sort((a, b) => a.numericKey - b.numericKey);

    const results = {};
    const numParties = parties.length;

    // Sorted municipalities
    municipalityKeys.forEach(({ originalKey, numericKey }, municipalityIndex) => {
        const municipalityLabel = municipalities[originalKey];
        const cleanMunicipalityLabel = municipalityLabel === 'Mainland Finland' ? municipalityLabel : municipalityLabel.substring(4); // Removing the first four characters (city coding)

        const municipalityResults = {};
        results[cleanMunicipalityLabel] = municipalityResults;

        // For each year
        Object.values(years).forEach((year, yearIndex) => {
            const yearResults = {};
            municipalityResults[year] = yearResults;

            // For each party
            parties.forEach((party, partyIndex) => {
                // The index in the values array that corresponds to the party value for a specific municipality and a year
                const indexOffset = yearIndex * municipalityKeys.length * numParties;
                const valueIndex = indexOffset + municipalityIndex * numParties + partyIndex;

                yearResults[party] = electionValues[valueIndex];
            });
        });
    });
    console.log(results);
    return results;
};

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
        // Add the click event listener only if there's data
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
                .setLatLng(e.latlng) // Binding the info to the layer's current position
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

function createMainlandFinlandResultsControl() {
    // Custom control for election results
    const ElectionResultsControl = L.Control.extend({
        options: {
            position: 'topright' // position in the map
        },

        onAdd: function (map) {
            // Create the control container with a particular class name and enhanced styling
            const container = L.DomUtil.create('div', 'election-results-control');

            // Adjust styles for a smaller, more compact container
            Object.assign(container.style, {
                backgroundColor: '#f9f9f9', // softer color
                width: '150px', // reduced width for a smaller control
                height: '300px',
                padding: '5px 10px', // reduced padding for a more compact layout
                border: '1px solid', // thinner border
                borderRadius: '5px', // smaller border radius
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', // less pronounced shadow
                color: '#333', // same color, good for readability
                fontSize: '12px', // smaller font size
                overflow: 'hidden', // ensure no internal content spills out
            });

            // Smaller header
            const header = document.createElement('div');
            header.id = 'results-header'; // Assign an ID to the header
            header.textContent = `Finland Results for ${selectedYear}`; // Set initial text
            header.style.fontWeight = 'bold';
            container.appendChild(header);

            // Placeholder for results, no change here
            const resultsContainer = document.createElement('div');
            resultsContainer.id = 'mainland-finland-results';
            container.appendChild(resultsContainer);

            return container;
        }
    });

    return new ElectionResultsControl();
}

// Function to update results with enhanced content formatting
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

    // Generate content with styling for a more compact view
    const header = document.getElementById('results-header');
    if (header) {
        header.textContent = `Finland Results for ${selectedYear}`; // Update to the current year
    }

    let contentHTML = '<div style="margin-top: 5px;">'; // Container for content, add a top margin for spacing
    for (const party in partyResults) {
        const percentage = ((partyResults[party] / totalVotes) * 100).toFixed(2);
        // Create a row for each party result, include a border-bottom, and align text to the left (party name) and right (percentage)
        contentHTML += `
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ddd; padding: 2px 0;">
                <span><strong>${party}</strong></span>
                <span>${percentage}%</span>
            </div>`;
    }
    contentHTML += '</div>';

    // Smaller pie chart or even consider excluding it for saving space
    contentHTML += '<div id="mini-pie-chart" style="height: 100px; width: 150px;"></div>'; // smaller pie chart

    // Update the control container with the compact content
    const resultsContainer = document.getElementById('mainland-finland-results');
    if (resultsContainer) {
        resultsContainer.innerHTML = contentHTML;

        // Adjust pie chart size when calling the creation function
        createPieChart('mini-pie-chart', 'Mainland Finland'); // ensure your pie chart adjusts to new dimensions
    }
}

function createFlagControl() {
    const FlagControl = L.Control.extend({
        options: {
            position: 'bottomleft' // the position of the control on the map
        },

        onAdd: function(map) {
            // create a div with a class "flag-icon"
            const container = L.DomUtil.create('div', 'flag-icon');

            // create an image tag inside the div
            const img = L.DomUtil.create('img', '', container);

            // set the src attribute to the image's URL
            img.src = './images/Flag_of_Finland.svg';  // put the URL or relative path of your flag image here
            img.style.width = '100px'; // or the size you prefer
            img.style.height = '75px'; // or the size you prefer
            img.style.paddingBottom = '85%'; // or the size you prefer50px'; // or the size you prefer

            // Prevent events from getting to the map through the flag (clicks, scrolls, etc.)
            L.DomEvent.disableClickPropagation(container);
            L.DomEvent.disableScrollPropagation(container);

            return container;
        }
    });

    return new FlagControl();
}

function displayMunicipalityData(municipalityName) {
    // Hide map and other elements
    document.getElementById('map').style.display = 'none';
    document.getElementById('map-legend').style.display = 'none';
    document.querySelectorAll('.year-buttons').forEach(el => el.style.display = 'none');
    document.getElementById('year-selector').style.display = 'none';

    // Get the main container for charts and clear any previous content
    const chartsContainer = document.getElementById('charts');
    chartsContainer.innerHTML = '';

    // Create separate containers for the pie chart and the bar chart
    const pieChartContainer = document.createElement('div');
    pieChartContainer.id = 'pie-chart-container';  // Set an ID for possible future reference
    chartsContainer.appendChild(pieChartContainer);

    const barChartContainer = document.createElement('div');
    barChartContainer.id = 'bar-chart-container';  // Set an ID for possible future reference
    chartsContainer.appendChild(barChartContainer);

    const timeSeriesChartContainer = document.createElement('div');
    timeSeriesChartContainer.id = 'time-series-chart-container';  // Set an ID for possible future reference
    chartsContainer.appendChild(timeSeriesChartContainer);

    const stackedAreaChartContainer = document.createElement('div');
    stackedAreaChartContainer.id = 'stacked-area-chart-container';  // Set an ID for possible future reference
    chartsContainer.appendChild(stackedAreaChartContainer);

    // Create and display the charts in their respective containers
    createPieChart(pieChartContainer, municipalityName); // existing pie chart
    createBarChart(barChartContainer, municipalityName); // new bar chart
    createTimeSeriesChart(timeSeriesChartContainer, municipalityName);
    createStackedAreaChart(stackedAreaChartContainer, municipalityName);

    // Make the main container visible
    chartsContainer.style.display = 'block';

    // Show the 'Back' button
    const backButton = document.getElementById('back-button');
    backButton.style.display = 'block';
}

function createPieChart(container, municipalityName) {
    const municipalityData = allElectionData[municipalityName][selectedYear];
    const data = [];

    // Prepare the data for Highcharts
    Object.entries(municipalityData).forEach(([party, voteCount]) => {
        if (party !== 'Total') {
            data.push({
                name: party,
                y: voteCount,
                color: partiesInfo[party].color, // assuming color information is stored here
            });
        }
    });

    // Create the Highcharts chart
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
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' // Optional: if you want to show percentages in the tooltip as well
        },
        accessibility: {
            point: {
                valueSuffix: '%' // Optional: for screen readers
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: container === 'mini-pie-chart' ? false :true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %', // Format the data label to show the percentage
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
                color: partiesInfo[party].color, // assuming color information is stored here
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
    const municipalityData = allElectionData[municipalityName]; // Data for the specific municipality

    // Extracting all the years available for the municipality data
    const categories = Object.keys(municipalityData).sort();

    // Prepare the series array that will contain each party's data
    const series = [];

    // Get all parties from the first available year (assuming consistent parties across years)
    const firstYearParties = Object.keys(municipalityData[categories[0]]);
    const parties = firstYearParties.filter(party => party !== 'Total'); // Exclude 'Total'

    parties.forEach(party => {
        const data = categories.map(year => {
            const totalVotes = municipalityData[year]['Total'] || 1; // to avoid division by zero
            const partyVotes = municipalityData[year][party] || 0; // Return vote count or 0 if no data exists
            const percentage = (partyVotes / totalVotes * 100).toFixed(2); // Calculate percentage

            return {
                y: partyVotes,
                percentage: percentage
            };
        });

        series.push({
            name: party,
            data: data,
            color: partiesInfo[party].color, // Assign the color from your partiesInfo
        });
    });

    // Create the chart with Highcharts
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
                format: '{value}' // to ensure that vote counts are displayed as integers on the yAxis
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
                        return `${this.y} (${this.point.percentage}%)`; // Display both vote count and percentage
                    }
                },
                enableMouseTracking: true
            }
        },
        series: series
    });
}

function createStackedAreaChart(container, municipalityName) {
    const municipalityData = allElectionData[municipalityName]; // Data for the specific municipality

    // Extracting all the years available for the municipality data
    const categories = Object.keys(municipalityData).sort();

    // Prepare the series array that will contain each party's data
    const series = [];

    // Get all parties from the first available year (assuming consistent parties across years)
    const firstYearParties = Object.keys(municipalityData[categories[0]]);
    const parties = firstYearParties.filter(party => party !== 'Total'); // Exclude 'Total'

    parties.forEach(party => {
        const data = categories.map(year => {
            const partyVotes = municipalityData[year][party] || 0; // Return vote count or 0 if no data exists
            return partyVotes; // For stacked charts, we're interested in absolute numbers, not percentages
        });

        series.push({
            name: party,
            data: data,
            color: partiesInfo[party].color, // Assign the color from your partiesInfo
        });
    });

    // Create the chart with Highcharts
    Highcharts.chart(container, {
        chart: {
            type: 'area', // This defines the chart as a stacked area chart
            zoomType: 'x', // Allow zooming in the x direction (optional)
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
                    color: ( // theme
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
                stacking: 'normal', // This option sets the stacking
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
            partyLink.target = '_blank'; // Open in a new tab.
            const linkIcon = document.createElement('i');
            linkIcon.className = 'fas fa-external-link-alt';

            // Appending the text and the icon to the link element
            partyLink.appendChild(linkIcon);

            legendKey.appendChild(partyLink);
        }

        legendContainer.appendChild(legendKey);
    }
}

const getWinningPartyColor = (municipalityResults, year) => {
    const results2021 = municipalityResults[year];
    let highestPercentage = 0;
    let winningParty = '';
    let knownPartiesTotalVotes = 0;  // Sum of votes for known parties

    // Total votes for known parties
    for (const [party, votes] of Object.entries(results2021)) {
        if (party !== 'Total') {
            knownPartiesTotalVotes += votes;
        }
    }

    // Votes categorized under "Others"
    const otherVotes = results2021['Total'] - knownPartiesTotalVotes;
    const otherPercentage = (otherVotes / results2021['Total']) * 100;

    // Finding the winning party or if "Others" have the highest percentage
    for (const [party, votes] of Object.entries(results2021)) {
        if (party === 'Total') continue; // Skip the 'Total' entry.

        const votePercentage = (votes / results2021['Total']) * 100;

        if (votePercentage > highestPercentage) {
            highestPercentage = votePercentage;
            winningParty = party;
        }
    }

    if (otherPercentage > highestPercentage) {
        winningParty = 'Others';
    }

    if (winningParty === '') return '#808080'; // No data available

    return partiesInfo[winningParty].color;
};
