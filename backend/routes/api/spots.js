const express = require('express');
const { Op } = require('sequelize');
const {Spot, SpotImage, Review, sequelize} = require('../../db/models');
const spot = require('../../db/models/spot');

const router = express.Router();

// Get all Spots
router.get('/', async (req, res) => {
  res.status(200);

  // const allSpots = await Spot.findAll({
  //   attributes: {
  //     include: [
  //       [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating'],
  //       [sequelize.col('url'), 'previewImage']
  //     ]
  //   },
  //   include: [{model: Review, attributes: []},{model: SpotImage, attributes: []}],
  //   order: ['id'],
  //   group: ['Spot.id', 'SpotImages.url'],
  // });
  // const allSpots = await Spot.findAll();


  // allSpots.forEach(async (spot) => {
  //   // spot.id || previewImage.url
  //   const previewImage = await SpotImage.findByPk(spot.id);
  //   const review = await Review.findOne({where: {spotId: spot.id}});
  //   console.log(review); // 1 & 3 come back !2 ||| 2 has no reviews
  //   // console.log(`spot: ${spot.id}`, previewImage.url);

  // });

  const spots = await Spot.findAll({
    include: [
      {
        model: Review
      },
      {
        model: SpotImage
      }
    ]
  });

  let spotsList = [];
  spots.forEach(spot => {
    spotsList.push(spot.toJSON());
  });


  spotsList.forEach(spot => {
    let sum = 0;
    let count = 0;

    spot.Reviews.forEach(review => {
      // Sum of all stars for one spot
      sum += review.stars;
      // count of all reviews for one spot
      count++;
    })
    //calculate average
    spot.avgRating = sum/count;
    if(!spot.avgRating) spot.avgRating = 0;

    spot.SpotImages.forEach(image => {
      if(image.preview) spot.previewImage = image.url;
      if(!spot.previewImage) spot.previewImage = 'Spot has no images';
    });

    delete spot.Reviews;
    delete spot.SpotImages;
  })

  const Spots = {['Spots']: spotsList}

  res.json(Spots);
})

module.exports = router;
