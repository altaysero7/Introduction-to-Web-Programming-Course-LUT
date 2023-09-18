// Referencing: https://linuxhint.com/window-onload-event-in-javascript/
// Referencing: https://alvarotrigo.com/blog/change-css-javascript/

window.onload = createTableBody;

async function fetchData(url) {
    try {
        const result = await fetch(url);
        const responseData  = await result.json();
        return responseData;
    } catch (error) {
        console.log("Error happened while fetching: ", error);
    }
}

function getMunicipalityAndPopulation(responseData, tableBody) {
    const municipalities = responseData.dataset.dimension.Alue.category.label;
    const values = responseData.dataset.value;

    Object.keys(municipalities).forEach((key, index) => {
        const newTableRow = document.createElement('tr');
        const municipalityData = document.createElement('td');
        const populationData = document.createElement('td');

        municipalityData.innerText = municipalities[key];
        populationData.innerText = values[index];

        newTableRow.appendChild(municipalityData);
        newTableRow.appendChild(populationData);
        tableBody.appendChild(newTableRow);
    });
}

function getEmploymentAmount(responseData, rows) {
    const values = responseData.dataset.value;

    Object.keys(values).forEach((_key, index) => {
        const employmentAmountData = document.createElement('td');
        employmentAmountData.innerText = values[index];

        rows[index].appendChild(employmentAmountData);
    });
}

function getEmploymentPercentage(rows) {
    let index = 0;
    rows.forEach((row) => {
        const population = parseFloat(row.children[1].innerText);
        const employment = parseFloat(row.children[2].innerText);

        const percentage = document.createElement('td');
        const percentageAmount = ((employment/population) * 100).toFixed(2);
        percentage.innerText = percentageAmount + '%';

        const tr = document.querySelector(`tr:nth-child(${index + 1})`);
        if (percentageAmount > 45) {
            tr.style.backgroundColor = '#abffbd';
        } else if (percentageAmount < 25) {
            tr.style.backgroundColor = '#ff9e9e';
        }

        row.appendChild(percentage);
        index++;
    });
}

async function createTableBody() {
    const tableBody = document.querySelector('tbody');
    let url = 'https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff';
    let responseData = await fetchData(url);
    if (responseData) {
        getMunicipalityAndPopulation(responseData, tableBody);
    }

    const rows = tableBody.querySelectorAll('tr');
    url = 'https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065';
    responseData = await fetchData(url);
    if (responseData) {
        getEmploymentAmount(responseData, rows);
    }

    getEmploymentPercentage(rows);
}