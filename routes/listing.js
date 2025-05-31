const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const multer = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer( { storage });
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingController = require("../controllers/listing.js");

router.route("/")
    .get(wrapAsync(listingController.index)) 
    .post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing) //create listing route
);

//create new listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing)) //show route
.put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing)) //update route
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); //delete route

//edit
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;