const express = require("express")
const router = express.Router();
const bcrypt = require('bcryptjs');

//BRING THE USER MODEL TO SAVE IT TO DB
const User = require('../models/User');

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/register', (req, res) => {
    res.render('register')
});

//RESGISTER USER 
router.post('/register', (req, res) => {
    const {first_name, last_name, email, password, password_confirmation, user_avatar} = req.body;

//Check errors
    let errors = [];
// Check required field
    if(!first_name || !last_name || !email || !password || !password_confirmation) {
        errors.push({msg: "Please fill in required fields"});
    }
// Check passwords match 
    if(password !== password_confirmation) {
        errors.push({msg: "Passwords do not match"});
    }
//Check that password is at least 6 charachters long
    if(password.length < 6) {
        errors.push({msg: 'Password must be at least six charachters'});
    }

    if(errors.length > 0) {
        res.render('register', {
            errors,
            first_name,
            last_name,
            email,
            password,
            password_confirmation
        });
        console.log(errors);
    }else {
        //VALIDATION PASSED
        User.findOne({email: email}).then(user => {
            if(user) {
                //USER Exist
                errors.push({msg: 'Email already register. Please Login'});
                res.render('register', {
                    errors,
                    first_name,
                    last_name,
                    email,
                    password,
                    password_confirmation
                });
            } else {
                const newUser = new User({
                    first_name,
                    last_name,
                    email,
                    password,
                    password_confirmation
                });
                console.log(newUser);
                res.send('Ahora Si');
            }
        })
    }
    res.send("Successfully Registered") 
})

module.exports = router;
