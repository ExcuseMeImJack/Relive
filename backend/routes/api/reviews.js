const express = require("express");
const { Spot, SpotImage, Review, User, ReviewImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.get('/current', requireAuth, async(req, res) => {
  const {user} = req;
  if(user) {
    const reviews = await Review.findAll({
      where:
      {
        userId: user.id
      },
      include:
      [
        {
          model: User,

        },
        {
          model: Spot,
          include: {
            model: SpotImage
          }
        },
        {
          model: ReviewImage
        }
      ]
    }
  );

  let reviewsList = [];
  reviews.forEach(review => {
    reviewsList.push(review.toJSON());
  })

  reviewsList.forEach(review => {
    delete review.User.username;
    delete review.Spot.createdAt;
    delete review.Spot.updatedAt;
    delete review.Spot.description;


    review.Spot.SpotImages.forEach(spotImage => {
      if(spotImage.preview) review.Spot.previewImage = spotImage.url;
    })
    
    delete review.Spot.SpotImages;
    review.ReviewImages.forEach(image => {
      delete image.reviewId;
      delete image.createdAt;
      delete image.updatedAt;
    })
  })


  const Reviews = {["Reviews"]: reviewsList}

    res.status(200).json(Reviews);
  }
});




module.exports = router;
