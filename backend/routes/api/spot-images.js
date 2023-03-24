const express = require("express");
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
  const spotImage = await SpotImage.findByPk(req.params.imageId);

  if(!spotImage) return res.status(404).json({ message: "Spot Image couldn't be found" });

  const spot = await Spot.findOne({where:{id: spotImage.spotId}})

  const {user} = req;

  if(spot.ownerId === user.id){
    await spotImage.destroy();
    res.status(200).json({message: "Successfully deleted"})
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
});

module.exports = router;
