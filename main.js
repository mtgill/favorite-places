let places = [];
const printToDom = (divId, textToPrint) => {
    const selectedDiv = document.getElementById(divId);
    selectedDiv.innerHTML = textToPrint;
};

const getPlacesData = () => {
    const placesRequest = new XMLHttpRequest();
    placesRequest.addEventListener('load', executeAfterLoad);
    placesRequest.addEventListener('error', executeAfterFail);
    placesRequest.open('GET', './db/places.json');
    placesRequest.send();
};

function executeAfterLoad(){
    const data = JSON.parse(this.responseText);
    places = data.places;
    domStringBuilder(data.places);
    console.log(data.places);
}

function executeAfterFail(){
    console.error('You played ya-self');
}

const domStringBuilder = (arrayToPrint) => {
    let domString = "";
    arrayToPrint.forEach((place) => {
        domString += `<div class="col-sm-12 col-md-6 col-lg-4 place">`;
        domString += `<div class="card">`;
        domString += `<div class="title"><h2><b>${place.cityName}</b></h2>`;
        domString += `<h3>State: <b>${place.cityState}</b></h3>`;
        domString += `</div>`;
        domString += `<img src=${place.cityImage} class='img-fluid'></img>`;
        domString += `<h3>Favorite Restaurant: <b>${place.favoriteRestaurant}</b></h3>`;
        domString += `<h3>Favorite Bar: <b>${place.favoriteBar}</b></h3>`;
        domString += `<h3>Favorite Hotel: <b>${place.favoriteHotel}</b></h3>`;
        domString += `<h3>Favorite Tourist Attraction: <b>${place.favoriteTouristAttraction}</b></h3>`;
        domString += `</div>`;
        domString += `</div>`;
    });
    printToDom('places-div', domString);
}

const sortAction = (e) => {
    const buttonId = e.target.id;

    let selectedPlaces = [];
    places.forEach((place) => {
        if(buttonId === place.costOfLiving){
            console.log('buttons work');
            selectedPlaces.push(place);
        }
    });
    if(buttonId === 'all'){
        domStringBuilder(places);
    }
    else{
    domStringBuilder(selectedPlaces);
    }
}


const sortButtonEvents = () => {
    const sortButtons = document.getElementsByClassName('sort-buttons');
    for(let i = 0; i < sortButtons.length; i++){
        sortButtons[i].addEventListener('click', sortAction);
    }
}

const init = () => {
    getPlacesData();
    sortButtonEvents();
}

init();