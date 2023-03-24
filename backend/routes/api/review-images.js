const express = require("express");
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
  const reviewImage = await ReviewImage.findByPk(req.params.imageId);

  if(!reviewImage) return res.status(404).json({ message: "Review Image couldn't be found" });

  const review = await Review.findOne({where:{id: reviewImage.reviewId}})

  const {user} = req;

  if(review.userId === user.id){
    await reviewImage.destroy();
    res.status(200).json({message: "Successfully deleted"})
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
});

module.exports = router;
