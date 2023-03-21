const express = require('express');
const { Op } = require('sequelize');
const {Spot, SpotImage, Review, User, sequelize} = require('../../db/models');
const {requireAuth} = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSpotCreations = [
  check('address')
    .exists({checkFalsy: true})
    .withMessage('Street address is required'),
  check('city')
    .exists({checkFalsy: true})
    .withMessage('City is required'),
  check('state')
    .exists({checkFalsy: true})
    .withMessage('State is required'),
  check('country')
    .exists({checkFalsy: true})
    .withMessage('Country is required'),
  check('lat')
    .isFloat({min: -90, max: 90})
    .withMessage('Latitude is not valid'),
  check('lng')
    .isFloat({min: -180, max: 180})
    .withMessage('Longitude is not valid'),
  check('name')
    .exists({checkFalsy: true})
    .withMessage('Name is required'),
  check('name')
    .isLength({max: 49})
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({checkFalsy: true})
    .withMessage('Description is required'),
  check('price')
    .exists({checkFalsy: true})
    .withMessage('Price per day is required'),
  handleValidationErrors
];

// Create a Spot
router.post('/', [requireAuth, validateSpotCreations], async (req, res, next) => {

  const {user} = req;
  if(user){
    const {address, city, state, country, lat, lng, name, description, price} = req.body;

    const newSpot = await Spot.create({
      ownerId: user.id,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    });

    res.status(201).json(newSpot);
  }
});

// Get all Spots
router.get('/', async (req, res) => {

  const spots = await Spot.findAll({
    include: [
      {
        model: Review
      },
      {
        model: SpotImage
      }
    ],
    order:['id']
  });

  let spotsList = [];
  spots.forEach(spot => {
    spotsList.push(spot.toJSON());
  });


  spotsList.forEach(spot => {
    let sum = 0;
    let count = 0;

    // Setting and calculating the avgRating within Spots
    spot.Reviews.forEach(review => {

      // Sum of all stars for one spot
      sum += review.stars;

      // count of all reviews for one spot
      count++;
    })

    //calculate average
    spot.avgRating = (sum/count).toFixed(1);
    if(isNaN(spot.avgRating)) spot.avgRating = 0;

    // Setting the previewImage within Spots
    spot.SpotImages.forEach(image => {
      if(image.preview) spot.previewImage = image.url;
    });
    
    if(!spot.previewImage) spot.previewImage = 'Spot has no images';

    delete spot.Reviews;
    delete spot.SpotImages;
  })

  const Spots = {['Spots']: spotsList};

  res.status(200).json(Spots);
});

module.exports = router;
