const express = require("express");
const { Spot, SpotImage, Review, User, ReviewImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateReview = [
  check('review').exists({checkFalsy: true}).withMessage("Review text is required"),
  check('stars').isInt({min: 1, max: 5}).withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors
]

router.get('/current', requireAuth, async(req, res) => {
  const {user} = req;
  if(user) {
    const reviews = await Review.findAll({where: {userId: user.id},
      include:[
        {
          model: User,

        },
        {
          model: Spot,
          include:
          {
            model: SpotImage
          }
        },
        {
          model: ReviewImage
        }
      ]}
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

router.put('/:reviewId', [requireAuth, validateReview], async (req, res) => {
  const {user} = req;

  const searchReview = await Review.findByPk(req.params.reviewId);

  if (!searchReview) return res.status(404).json({message: "Review couldn't be found"});

  if(user.id === searchReview.userId){
    const {review, stars} = req.body;

    const updatedReview = await searchReview.update({
      review,
      stars
    });

    res.status(200).json(updatedReview);
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
})

module.exports = router;
