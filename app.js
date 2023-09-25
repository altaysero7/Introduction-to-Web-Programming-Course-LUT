// Referencing: https://tshlosberg.medium.com/addeventlistener-vs-onclick-which-one-should-you-use-47550d7e7487#:~:text=addEventListener()%20on%20the%20other,button%20element%20in%20const%20btn.

async function searchShow() {
    const urlSource = 'https://api.tvmaze.com/search/shows?q=';
    const queryParam = document.getElementById('input-show').value;
    const URL = urlSource + queryParam;
    try {
        const result = await fetch(URL);
        const responseData  = await result.json();
        createShowData(responseData);
    } catch (error) {
        console.log("Error happened while fetching: ", error);
    }
}

function createShowData(data) {
    const showContainer = document.querySelector(".show-container");
    while (showContainer.firstChild) {
        showContainer.removeChild(showContainer.firstChild);
    }
    data.forEach(element => {
        const showData = document.createElement('div');
        showData.className = 'show-data';
        const img = document.createElement('img');
        try {
            img.src = element.show.image.medium;
        } catch (error) {
            console.log(error);
        }
        const showInfo = document.createElement('div');
        showInfo.className = 'show-info';
        const h1 = document.createElement('h1');
        h1.innerHTML = element.show.name;
        const p = document.createElement('div');
        p.innerHTML = element.show.summary;
        showContainer.appendChild(showData);
        showData.appendChild(img);
        showData.appendChild(showInfo);
        showInfo.appendChild(h1);
        showInfo.appendChild(p);
    });
}
