// Referencing: week 6 source code in the lecture notes
// Referencing: https://stackoverflow.com/questions/63863408/how-do-i-switch-between-html-pages-in-javascript
// Referencing: https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript

let populationData;
let frappeChart;
const areaNamesAndCodes = {};
let inputValue;
let titleText;

const jsonQuery = {
    "query": [
        {
            "code": "Vuosi",
            "selection": {
                "filter": "item",
                "values": [
                    "2000",
                    "2001",
                    "2002",
                    "2003",
                    "2004",
                    "2005",
                    "2006",
                    "2007",
                    "2008",
                    "2009",
                    "2010",
                    "2011",
                    "2012",
                    "2013",
                    "2014",
                    "2015",
                    "2016",
                    "2017",
                    "2018",
                    "2019",
                    "2020",
                    "2021"
                ]
            }
        },
        {
            "code": "Alue",
            "selection": {
                "filter": "item",
                "values": [
                    "SSS"
                ]
            }
        },
        {
            "code": "Tiedot",
            "selection": {
                "filter": "item",
                "values": [
                    "vaesto"
                ]
            }
        }
    ],
    "response": {
        "format": "json-stat2"
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("inputValue")) {
        inputValue = urlParams.get("inputValue");
    }
    const inputArea = document.getElementById('input-area');
    if (inputArea && inputValue && inputValue != 'whole country') {
        inputArea.value = capitalizeString(inputValue);
    }
    if (window.location.pathname == "/newchart.html") {
        matchAreaNamesAndCodes().then(() => {
            fetchBirthAndDeathData(inputValue);
        });
        return;
    } else {
        matchAreaNamesAndCodes().then(async () => {
            const url = 'https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px';

            populationData = await fetch(url,
                {
                    method: 'POST',
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(jsonQuery)
                }).then(res => res.json());

            createChart(populationData);

        });
    }
});

const formElement = document.querySelector('form');
const addDataElement = document.getElementById('add-data');

if (formElement) {
    formElement.addEventListener('submit', function (event) {
        event.preventDefault();
        inputValue = document.getElementById('input-area').value.toLowerCase();
        fetchSearchedData(inputValue);
    });
}

if (addDataElement) {
    addDataElement.addEventListener('click', function () {
        if (!frappeChart) {
            console.log('There is no frappeChart');
            return;
        }
        const predictedData = calculatePredictedDataPoint(frappeChart.data.datasets[0].values);
        const lastYear = parseInt(frappeChart.data.labels[frappeChart.data.labels.length - 1]);
        const nextYear = lastYear + 1;

        frappeChart.data.labels.push(`${nextYear}`);
        frappeChart.data.datasets[0].values.push(predictedData);
        frappeChart.update();
    });
}

document.getElementById('navigation').addEventListener('click', function (event) {
    event.preventDefault();
    navigate();
});

async function matchAreaNamesAndCodes() {
    const url = 'https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px';

    try {
        const data = await fetch(url).then(res => res.json());
        //console.log(data);
        const names = data.variables[1].valueTexts;
        const codes = data.variables[1].values;

        names.forEach((name, index) => {
            areaNamesAndCodes[name.toLowerCase()] = codes[index]
        });

    } catch (error) {
        console.log("Error happened while fetching: ", error);
    }
}

function calculatePredictedDataPoint(values) {
    let deltaSum = 0;
    for (let i = 1; i < values.length; i++) {
        deltaSum += (values[i] - values[i - 1]);
    }
    const meanDelta = (deltaSum / (values.length - 1)) + values[values.length - 1];
    return meanDelta;
}

function navigate() {
    let newLocation = (window.location.pathname === "/index.html" || window.location.pathname === "/") ? "./newchart.html" : "./index.html";
    if (inputValue) {
        newLocation += `?inputValue=${inputValue}`;
    }
    window.location.href = newLocation;
}

function capitalizeString(string) {
    if (string === "whole country") {
        return string;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function fetchSearchedData(inputValue) {
    const inputValueCode = areaNamesAndCodes[inputValue];
    if (!inputValueCode) {
        console.log("No result with this input");
        return;
    }
    const alue = jsonQuery.query.find(item => item.code === "Alue");
    alue.selection.values = [inputValueCode];
    const url = 'https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px';


    populationData = await fetch(url,
        {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(jsonQuery)
        }).then(res => res.json());

    createChart(populationData);

}

async function fetchBirthAndDeathData(inputValue) {
    if (!inputValue) {
        inputValue = "SSS";
    } else {
        const inputValueCode = areaNamesAndCodes[inputValue];
        if (!inputValueCode) {
            console.log("No result with this input");
            return;
        }
        const alue = jsonQuery.query.find(item => item.code === "Alue");
        alue.selection.values = [inputValueCode];
    }

    const url = 'https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px';

    try {
        const tiedot = jsonQuery.query.find(item => item.code === "Tiedot");
        tiedot.selection.values = ["vm01"];
        const birthData = await fetch(url,
            {
                method: 'POST',
                headers: { "content-type": "application/json" },
                body: JSON.stringify(jsonQuery)
            }).then(res => res.json());

        tiedot.selection.values = ["vm11"];
        const deathData = await fetch(url,
            {
                method: 'POST',
                headers: { "content-type": "application/json" },
                body: JSON.stringify(jsonQuery)
            }).then(res => res.json());

        createBarChart(birthData, deathData);

    } catch (error) {
        console.log("Error happened while fetching: ", error);
    }
}

function createChart(data) {
    const years = Object.values(data.dimension.Vuosi.category.label);
    const values = Object.values(data.value);

    titleText = inputValue ? `Population growth in ${capitalizeString(inputValue)}` : 'Population growth in whole country';

    frappeChart = new frappe.Chart("#chart", {
        data: {
            labels: years,
            datasets: [
                {
                    name: "Population Statistics",
                    values: values
                }
            ]
        },
        height: 450,
        type: "line",
        colors: ['#eb5146'],
        title: titleText
    });
}

function createBarChart(birthData, deathData) {
    const years = Object.values(birthData.dimension.Vuosi.category.label);
    const birthDataValues = Object.values(birthData.value);
    const deathDataValues = Object.values(deathData.value);

    titleText = inputValue ? `Births and death in ${capitalizeString(inputValue)}` : 'Births and death in whole country';

    frappeChart = new frappe.Chart("#chart", {
        data: {
            labels: years,
            datasets: [
                {
                    name: "Birth Statistics",
                    values: birthDataValues
                },
                {
                    name: "Death Statistics",
                    values: deathDataValues
                }
            ]
        },
        height: 450,
        type: "bar",
        colors: ['#63d0ff', '#363636'],
        title: titleText
    });
}
