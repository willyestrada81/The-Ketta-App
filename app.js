require('dotenv').config()
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose'); 

//MONGO DB CONFIG
const mongoDB = process.env.MongoURI;

//CONNECT TO MONGODB USING MONGOOSE
mongoose.connect(mongoDB, { useNewUrlParser: true })
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err)); 

const app = express();
const PORT = process.env.PORT || 5000;  


//EJS
app.set("view engine", "ejs");

//BBODY PARSER - NEEDED TO READ FROM FORMS
app.use(express.urlencoded({ extended: false }));

//EXPRESS TO SERVE STATIC FILES
app.use(express.static("public"));

//ROUTES --- NEED TO BE PLACED BELLOW THE ABOVE CONFIGURATION
app.use('/', require('./routes/index')); //IMPORT ROUTES FROM THE INDEX.JS FILE IN THE ROUTER FOLDER
app.use('/users', require('./routes/users')); //IMPORT ROUTES FROM THE INDEX.JS FILE IN THE ROUTER FOLDER



app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)    
})