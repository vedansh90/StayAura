const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/review.js");

// post review route
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// Delete Review route
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;

// const express = require("express");
// const router = express.Router({ mergeParams: true });
// const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const { reviewSchema } = require("../schema.js");
// const Review = require("../models/review.js");
// const Listing = require("../models/listing.js");

// // Function to validate review data
// const validateReview = (req, res, next) => {
//     // Joi schema se data validate karna
//     let { error } = reviewSchema.validate(req.body);
//     if (error) {
//         // Agar error hai toh uska message generate karke throw karna
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     } else {
//         next(); // Agar valid hai toh next middleware pe move karo
//     }
// };

// // POST route to add a review
// router.post("/", validateReview, wrapAsync(async (req, res) => {
//     // Pehle listing ko find karo ID se
//     let listing = await Listing.findById(req.params.id);

//     if (!listing) {
//         // Agar listing nahi mili toh error throw karo
//         throw new ExpressError(404, "Listing Not Found");
//     }

//     // Naya review create karo aur listing ke reviews array me push karo
//     let newReview = new Review(req.body.review);
//     listing.reviews.push(newReview);

//     // Dono ko save karo
//     await newReview.save();
//     await listing.save();

//     req.flash("success", "New Review Created"); // Success message
//     res.redirect(`/listings/${listing._id}`); // Redirect listing page pe
// }));

// // DELETE route to delete a review
// router.delete("/:reviewId", wrapAsync(async (req, res) => {
//     // Params se ID aur reviewId extract karo
//     let { id, reviewId } = req.params;

//     // Pehle Listing find karke usse review hatao
//     let listing = await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
// if (!listing) {
//         // Agar listing nahi mili toh error throw karo
//         throw new ExpressError(404, "Listing Not Found");
//     }

//     // Review delete karo
//     await Review.findByIdAndDelete(reviewId);

//     req.flash("success", "Review Deleted"); // Success message
//     console.log("Deleted Review ID:", reviewId); // Debug ke liye log karo
//     res.redirect(`/listings/${id}`); // Listing page pe redirect karo
// }));

// module.exports = router;