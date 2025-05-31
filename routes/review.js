const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview} = require('../middleware.js');
const { isLoggedIn } = require("../middleware");
const {isReviewAuthor} = require('../middleware.js');
const reviewController = require("../controllers/review.js");

//review
router.post("/", isLoggedIn, validateReview, wrapAsync (reviewController.createReview));

//delete review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;