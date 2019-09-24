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
    
             let responseData
 
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
                 })
                .finally(function () {
                console.log(responseData)
                // // console.log(responseData);
                // res.render("index", {
                //     restaurantData: responseData
                    
                // })
                
        });
    })
})

router.get('/restaurant/:id', (req, res) => {
    res.send('<h1>Welcome to the show page</h1>')
})

module.exports = router;