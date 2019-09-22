const express = require("express")
const router = express.Router();
const GoogleAPI = require('../config/keys').GoogleAPI;
const axios = require('axios');

//Landing Page
router.get('/', (req, res) => {
    res.render('landing')
})




router.post('/', (req, res) => {
  
    let queryParams = {
        input: req.body.restaurantName + '%20' + req.body.city,
        inputtype: 'textquery',
        fields: 'place_id,photos,formatted_address,name,rating,opening_hours,geometry,icon,user_ratings_total',
        APIkey: GoogleAPI
    }
    let requestURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${queryParams.input}&inputtype=${queryParams.inputtype}&fields=${queryParams.fields}&key=${queryParams.APIkey}`
    
    let responseData = []
    let photoURL = ''
 
    axios.get(requestURL)
        .then(function (response) {
            
            let candidates = response.data.candidates;

            for(var i = 0; i < candidates.length; i++){
                responseData[i] = {
                    formatted_address: candidates[i].formatted_address,
                    geometry: candidates[i].geometry.location,
                    name: candidates[i].name,
                    opening_hours: candidates[i].opening_hours,
                    rating: candidates[i].rating,
                    photos: candidates[i].photos[i],
                    user_ratings_total: candidates[i].user_ratings_total
                }
                
            }

        }).then(() => {
            let photoReference = responseData[0].photos.photo_reference; 
            photoURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1100&photoreference=${photoReference}&key=${queryParams.APIkey}`;
         
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            console.log(responseData)
            // console.log(responseData);
            res.render("index", {
                restaurantData: responseData,
                restaurantPhoto: photoURL
                
            })
            
        });
    
})

module.exports = router;