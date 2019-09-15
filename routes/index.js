const express = require("express")
const router = express.Router();

router.get('/', (req, res) => {
    res.render("landing")
})

// INDEX ROUTE -- SHOW LIST OF CAMPGROUNDS
router.get('/campgrounds', (req, res) => {
    // const campgrounds = Campground.find({}, (err, campgrounds) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         res.render("index.ejs", { campgrounds: campgrounds });
    //     }
    // })
    res.send("Welcome");
});

// NEW ROUTE -- SHOW THE FORM TO CREATE A NEW CAMPGROUNDS
router.get("/campgrounds/new", (req, res) => {
    res.render("new_campground");
});

// CREATE ROUTE -- CREATE A NEW CAMPGROUNDS
router.post("/campgrounds", (req, res) => {
    let campground_name = req.body.name;
    let campground_image = req.body.image;
    let campground_description = req.body.description;

    Campground.create(
        { name: campground_name, image: campground_image, description: campground_description },
        (err, campgrounds) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Campground Created Successfully");
                res.redirect("/campgrounds");
            }
        }
    );
});

// SHOW -- SHOW MORE INFO ABOUT ONE CAMPGROUND
router.get('/campgrounds/:id', (req, res) => {
    // FIND THE CAMPGROUND BY THE ID
    let campground_id = req.params.id;

    //RENDER THE SHOW TEMPLATE WITH THAT CAMPGROUND
    Campground.findById({ _id: campground_id }, (err, campground) => {
        if (err) {
            console.log(err)
        } else {
            res.render("show", { campground: campground });
        }
    })


})

module.exports = router;