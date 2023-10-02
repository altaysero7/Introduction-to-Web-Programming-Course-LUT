// Referencing: week 5 source code in the lecture notes

async function fetchData() {
    const urlGeoJson = 'https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326';
    const urlPositiveMigration = 'https://statfin.stat.fi/PxWeb/sq/4bb2c735-1dc3-4c5e-bde7-2165df85e65f';
    const urlNegativeMigration = 'https://statfin.stat.fi/PxWeb/sq/944493ca-ea4d-4fd9-a75c-4975192f7b6e';

    try {
        const [geoData, positiveMigrationData, negativeMigrationData] = await Promise.all([
            fetch(urlGeoJson).then(res => res.json()),
            fetch(urlPositiveMigration).then(res => res.json()),
            fetch(urlNegativeMigration).then(res => res.json())
        ]);

        const positiveMigrations = processMigrationData(positiveMigrationData, 'Tuloalue');
        const negativeMigrations = processMigrationData(negativeMigrationData, 'Lähtöalue');

        createMap(geoData, positiveMigrations, negativeMigrations);

    } catch (error) {
        console.log("Error happened while fetching: ", error);
    }
}

const processMigrationData = (data, type) => {
    const municipalities = data.dataset.dimension[type].category.label;
    const values = data.dataset.value;
    const migrations = {};

    Object.keys(municipalities).forEach((key, index) => {
        let municipalityName = municipalities[key];
        municipalityName = type === 'Tuloalue' ? municipalityName.replace("Arrival - ", "") : municipalityName.replace("Departure - ", "");
        migrations[municipalityName] = values[index];
    });

    return migrations;
}

function createMap(data, positiveMigrations, negativeMigrations) {
    if (!data) {
        return;
    }

    const map = L.map('map', {
        minZoom: -3,
    });

    const geoJson = L.geoJSON(data, {
        onEachFeature: (feature, layer) => getCustomFeature(feature, layer, positiveMigrations, negativeMigrations),
        style: (feature) => getCustomStyle(feature, positiveMigrations, negativeMigrations),
        weight: 2
    }).addTo(map);

    const openstreetMap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap"
    }).addTo(map);

    map.fitBounds(geoJson.getBounds());
}

const getCustomFeature = (feature, layer, positiveMigrations, negativeMigrations) => {
    if (!feature.properties.name) {
        return;
    }

    const municipalityName = feature.properties.name;
    layer.bindTooltip(municipalityName);

    const positiveMigrationsValues = positiveMigrations[municipalityName] || "Unknown";
    const negativeMigrationsValues = negativeMigrations[municipalityName] || "Unknown";
    layer.bindPopup(
        `<ul>
            <li>Name: ${municipalityName}</li>
            <li>Positive migration: ${positiveMigrationsValues}</li>
            <li>Negative migration: ${negativeMigrationsValues}</li>
        </ul>`
    );
}

const getCustomStyle = (feature, positiveMigrations, negativeMigrations) => {
    if (!feature.properties.name) {
        return;
    }
    const municipalityName = feature.properties.name;
    const negativeMigrationValue = negativeMigrations[municipalityName];

    if (negativeMigrationValue === 0) {
        return {
            color: '#FF0000',
        }
    }

    let hue = Math.pow((positiveMigrations[municipalityName] / negativeMigrationValue), 3) * 60;
    hue = Math.min(hue, 120);

    return {
        color: `hsl(${hue}, 75%, 50%)`,
    }
}

fetchData();
