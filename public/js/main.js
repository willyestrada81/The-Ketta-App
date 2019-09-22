
function initMap() {

    //Map Options
    let options = {
        zoom: 18,
        center: { lat: 25.75343, lng: -80.258618 },
    }
    let map = new google.maps.Map(document.getElementById('map'), options);

    // Add marker
    let marker = new google.maps.Marker({
        position: { lat: 25.75343, lng: -80.258618 },
        map: map,
        icon: '/img/map.png'
    })
}

// function activatePlacesSearch() {
//     var input = document.getElementById('search_term');
//     var options = { types: ['restaurant'] }
//     var autocomplete = new google.maps.places.Autocomplete(input, options);
// }
// API Config
let key = API_KEYS.GOOGLE_API;
let key2 = API_KEYS.AUTOCOMLETEKEY;
let src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
let googleAPI = document.getElementById('googleAPI');
googleAPI.src = src;

// let autoCompleteSRC = `https://maps.googleapis.com/maps/api/js?key=${key2}&libraries=places&callback=activatePlacesSearch`;
// let autocomplete = document.getElementById('autoComplete');
// autocomplete.src = autoCompleteSRC;