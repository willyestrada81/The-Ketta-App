require('dotenv').config()
const express = require("express")
const router = express.Router();
const GoogleAPI = require('../config/keys').GoogleAPI;
const axios = require('axios');
var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};

var geocoder = NodeGeocoder(options);
// Define escapeRegex function for search feature
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


// Landing Page
router.get('/', (req, res) => {
    res.render('landing')
})


router.post('/', (req, res) => {
  
let location = escapeRegex(req.body.location);
    geocoder.geocode(location)
        .then(function (data) {

            console.log(data);
            let lat = data[0].latitude;
            let lng = data[0].longitude
            console.log(`${lat} + ${lng}`)
             
            let queryParams = {
                location: { lat: lat, lng: lng },
                radius: '8047',
                type: 'restaurant',
                keyword: escapeRegex(req.body.keyword),
                APIkey: process.env.GoogleAPI
            }

             let requestURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${queryParams.location.lat},${queryParams.location.lng}&radius=${queryParams.radius}&type=${queryParams.type}&keyword=${queryParams.keyword}&key=${queryParams.APIkey}`
    
             let responseData;
 
             axios.get(requestURL)
             .then(function (response) {
            
                responseData = response.data.results;
                let totalResults = responseData.length;

            res.render("show", {
                restaurantData: responseData,
                totalResults: totalResults,
                location: location
            })
                 })
                 .catch(function (error) {
                     // handle error
                     console.log(error);
                     res.redirect('landing')
                 })
        }).catch(function (error) {
            // handle error
            console.log(error);
            res.redirect('landing')
        })
})

router.get('/restaurant/:id', (req, res) => {

    
    let options = {
        APIkey: process.env.GoogleAPI,
        fields: 'address_component,adr_address,formatted_address,geometry,icon,name,permanently_closed,photo,place_id,plus_code,type,url,utc_offset,vicinity,formatted_phone_number,opening_hours,website,price_level,rating,review,user_ratings_total',
        place_id: req.params.id
    }

    let placeDetailURL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${options.place_id}&fields=${options.fields}&key=${options.APIkey}`

    axios.get(placeDetailURL)
    .then(function(response) {
        let restaurantDetails = response.data.result;
        res.render('restaurant', {
            restaurant: restaurantDetails
            
        })
        console.log(response.data.result)
    })
    .catch(function(err) {
        if(err) {
            console.log(err)
            res.redirect('landing')
        }
    })

})

module.exports = router;