const express = require("express");
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const {Op} = require("sequelize");
const { where } = require("sequelize");

const router = express.Router();

const doesSpotExist = async (spotIdParam) => {
  const spots = await Spot.findAll({ attributes: ["id"] });
  let spotsList = [];
  let spotIds = [];

  spots.forEach((spot) => {
    spotsList.push(spot.toJSON());
  });

  spotsList.forEach((spot) => {
    spotIds.push(spot.id);
  });

  const numericSpotId = parseInt(spotIdParam);
  if (!spotIds.includes(numericSpotId)) return false;
  else return true;
};

const doesReviewExist = async (userId, spotId) => {
  const reviews = await Review.findAll({ where: {spotId: spotId}, attributes: ["userId"] });
  let reviewsList = [];
  let userIds = [];

  reviews.forEach((review) => {
    reviewsList.push(review.toJSON());
  });

  reviewsList.forEach((review) => {
    userIds.push(review.userId);
  });

  if (userIds.includes(userId)) return false;
  else return true;
};

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude is not valid"),
  check("lng")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude is not valid"),
  check("name").exists({ checkFalsy: true }).withMessage("Name is required"),
  check("name")
    .isLength({ max: 49 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

const validateReview = [
  check('review').exists({checkFalsy: true}).withMessage("Review text is required"),
  check('stars').isInt({min: 1, max: 5}).withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors
]

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', [requireAuth], async (req, res) => {
  const {user} = req;

  const spot = await Spot.findByPk(req.params.spotId);
  const bookings = await Booking.findAll({where:{spotId: req.params.spotId}});
  const errors = {};

  if(!spot) return res.status(404).json({ message: "Spot couldn't be found" });

  if(spot.ownerId !== user.id){

    let {startDate, endDate} = req.body;

    bookings.forEach(booking => {
      const bookingStartDate = booking.startDate;
      const bookingEndDate = booking.endDate;
      const newStartDate = new Date(startDate);
      const newEndDate = new Date(endDate);
      const bookingStartTime = bookingStartDate.getTime();
      const bookingEndTime = bookingEndDate.getTime();
      const startTime = newStartDate.getTime();
      const endTime = newEndDate.getTime();

      if (endTime <= startTime) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                endDate: "endDate cannot be on or before startDate"
            }
        });
      }

      if (startTime >= bookingStartTime && startTime <= bookingEndTime) errors.startDate = "Start date conflicts with an existing booking"

      if (endTime >= bookingStartTime && endTime <= bookingEndTime) errors.endDate = "End date conflicts with an existing booking"

    });

    if(Object.keys(errors).length) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors
      });
    }

    const intSpotId = parseInt(req.params.spotId);

    const newBooking = await Booking.build({
      spotId: intSpotId,
      userId: user.id,
      startDate,
      endDate
    })

    newBooking.createdAt = newBooking.createdAt;
    newBooking.updatedAt = newBooking.updatedAt;

    await newBooking.save();

    // So basically, any dates you get from the user or from your database, call toDateString on each of them, turning the resulting strings back into new Date() 's, then getTime on each of them, and you can compare those values to your heart's content.
    res.json(newBooking)
  } else {
    res.status(403).json({ message: "You cannot book your own Spot" });
  }
})

// Get all Bookings for a Spot based on the Spot's id
// If I defer, it is adam's fault
router.get('/:spotId/bookings', [requireAuth], async (req, res) =>{
  const {user} = req;

  const spot = await Spot.findByPk(req.params.spotId);

  if(!spot)  return res.status(404).json({ message: "Spot couldn't be found" });

  if(user.id === spot.ownerId){
    const ownerBookings = await Booking.findAll({where:{spotId: req.params.spotId}, include: [{model: User, attributes: {exclude:['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']}}]});

    return res.json({['Bookings']: ownerBookings})
  } else if(user.id !== spot.ownerId){
    const clientBookings = await Booking.findAll({where:{spotId: req.params.spotId}, attributes:{exclude:['id', 'userId', 'createdAt', 'updatedAt']}});
    return res.json({['Bookings']: clientBookings})
  }
});

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', [requireAuth, validateReview], async (req, res) => {
  const {user} = req;

  if ((await doesSpotExist(req.params.spotId)) === false)
  return res.status(404).json({ message: "Spot couldn't be found" });

  if(user) {
    if ((await doesReviewExist(user.id, req.params.spotId)) === false) return res.status(403).json({ message: "User already has a review for this spot" });
  }

  if(user){
    const spotIdInt = parseInt(req.params.spotId)
    const {review, stars} = req.body;
    const newReview = await Review.create({
      userId: user.id,
      spotId: spotIdInt,
      review,
      stars
    })

    res.status(201).json(newReview);
  }
});

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {

  if ((await doesSpotExist(req.params.spotId)) === false)
  return res.status(404).json({ message: "Spot couldn't be found" });

  const reviews = await Review.findAll({where: {spotId: req.params.spotId}, include: [
    {
      model: User
    },
    {
      model: ReviewImage
    }
  ]
  });

  let reviewsList = [];
  reviews.forEach(review => {
    reviewsList.push(review.toJSON());
  });

  reviewsList.forEach(review => {
    delete review.User.username;

    review.ReviewImages.forEach(image => {
      delete image.reviewId;
      delete image.createdAt;
      delete image.updatedAt;
    })
  });




  res.status(200).json({['Reviews']: reviewsList});
});

// Get all Spots owned by the Current User
router.get("/current", [requireAuth], async (req, res) => {
  const { user } = req;
  if (user) {

    const spots = await Spot.findAll({
      where: { ownerId: user.id },
      include: [
        {
          model: Review,
        },
        {
          model: SpotImage,
        },
      ],
      order: ["id"],
    });

    let spotsList = [];
    spots.forEach((spot) => {
      spotsList.push(spot.toJSON());
    });

    spotsList.forEach((spot) => {
      let sum = 0;
      let count = 0;

      spot.Reviews.forEach((review) => {
        sum += review.stars;
        count++;
      });

      spot.avgRating = parseFloat((sum / count).toFixed(1));
      if (isNaN(spot.avgRating)) spot.avgRating = 0;

      spot.SpotImages.forEach((image) => {
        if (image.preview) spot.previewImage = image.url;
      });

      if (!spot.previewImage) spot.previewImage = "Spot has no preview images";

      delete spot.Reviews;
      delete spot.SpotImages;
  });
  const Spots = { ["Spots"]: spotsList };

  res.status(200).json(Spots);
  }
});

// Create an Image for a spotId
router.post("/:spotId/images", requireAuth, async (req, res) => {
  if ((await doesSpotExist(req.params.spotId)) === false)
    return res.status(404).json({ message: "Spot couldn't be found" });

  const { user } = req;
  console.log(user);
  const spot = await Spot.findByPk(req.params.spotId);
  if (user.id === spot.ownerId) {
    const { url, preview } = req.body;

    const newSpotImage = await SpotImage.create({
      spotId: req.params.spotId,
      url,
      preview,
    });

    const newSpotImageModified = await SpotImage.findOne({where: {id: newSpotImage.id}, attributes: {exclude: ['spotId', 'updatedAt', 'createdAt']}});

    res.json(newSpotImageModified);
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
});

// Get details of a Spot from an id
router.get("/:spotId", async (req, res) => {
  if ((await doesSpotExist(req.params.spotId)) === false)
    return res.status(404).json({ message: "Spot couldn't be found" });

  let spot = await Spot.findByPk(req.params.spotId, {
    include: [
      {
        model: Review,
      },
      {
        model: User,
      },
    ],
  });

  spot = spot.toJSON();

  // Review Handling =======================================================
  let sum = 0;
  let count = 0;

  spot.Reviews.forEach((review) => {
    sum += review.stars;
    count++;
  });

  spot.numReviews = count;
  spot.avgStarRating = parseFloat((sum / count).toFixed(1));
  if (isNaN(spot.avgStarRating)) spot.avgStarRating = 0;

  // SpotImage Handling ====================================================
  const images = await SpotImage.findAll({
    where: { spotId: req.params.spotId },
    attributes: { exclude: ["spotId", "createdAt", "updatedAt"] },
  });
  spot.SpotImages = images;

  // User Handling =========================================================

  const owner = await User.findByPk(spot.ownerId, {
    attributes: ["id", "firstName", "lastName"],
  });
  spot.Owner = owner;
  // Remove the rest
  delete spot.Reviews;
  delete spot.User;

  res.json(spot);
});

// Delete a Spot
router.delete("/:spotId", [requireAuth], async (req, res) => {
  if ((await doesSpotExist(req.params.spotId)) === false) return res.status(404).json({ message: "Spot couldn't be found" });

  const { user } = req;

  const spot = await Spot.findByPk(req.params.spotId);

  if (user.id === spot.ownerId) {
    await spot.destroy();
    return res.status(200).json({ message: "Successfully deleted" });
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
});

// Edit a Spot
router.put("/:spotId", [requireAuth, validateSpot], async (req, res) => {

  const { user } = req;

  if (user) {

    const spot = await Spot.findByPk(req.params.spotId);

    if ((await doesSpotExist(req.params.spotId)) === false) return res.status(404).json({ message: "Spot couldn't be found" });

    if (user.id === spot.ownerId) {

      const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
      } = req.body;
      const spot = await Spot.findByPk(req.params.spotId);

      const updatedSpot = await spot.update({
        ownerId: user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
      });

      res.status(200).json(updatedSpot);
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  }
});

// Create a Spot
router.post("/", [requireAuth, validateSpot], async (req, res) => {
  const { user } = req;
  if (user) {
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;

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
      price,
    });

    res.status(201).json(newSpot);
  }
});

// const validateQueries = [
//   check('page')
//     .isInt({min: 1})
//     .withMessage("Page must be greater than or equal to 1"),
//   check('size')
//     .isInt({min: 1})
//     .withMessage("Size must be greater than or equal to 1"),
//   check('maxLat')
//     .isInt({min: -90, max: 90})
//     .withMessage("Maximum latitude is invalid"),
//   check('minLat')
//     .isInt({min: -90, max: 90})
//     .withMessage("Minimum latitude is invalid"),
//   check('minLng')
//     .isInt({min: -180, max: 180})
//     .withMessage("Maximum longitude is invalid"),
//   check('maxLng')
//     .isInt({min: -180, max: 180})
//     .withMessage("Minimum longitude is invalid"),
//   check('minPrice')
//     .isInt({min: 0})
//     .withMessage("Minimum price must be greater than or equal to 0"),
//   check('maxPrice')
//     .isInt({min: 0})
//     .withMessage("Maximum price must be greater than or equal to 0"),
//   handleValidationErrors
// ];

// Get all Spots
router.get("/", async (req, res) => {
  const error = {};

  let {page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query;

  if(!page) page = 1;
  if(!size) size = 20;
  const where = {};

  page = parseInt(page);
  size = parseInt(size);
  minLat = parseFloat(minLat);
  minLng = parseFloat(minLng);
  maxLng = parseFloat(maxLng);
  minPrice = parseFloat(minPrice);
  maxPrice = parseFloat(maxPrice);

  if(page || page === 0){
    if(page < 1 || isNaN(page)) error.page = "Page must be greater than or equal to 1";
  }
  if(size || size === 0){
    if(size < 1 || isNaN(size)) error.size = "Size must be greater than or equal to 1";
  }
  if(maxLat){
    maxLat = parseFloat(maxLat);
    if(maxLat < minLat || maxLat < -90 || maxLat > 90 || isNaN(maxLat)) error.maxLat = "Maximum latitude is invalid";
    else where.lat = {
      [Op.lte]: maxLat
    };
  }
  if(minLat){
    if(minLat > maxLat || minLat < -90 || minLat > 90 || isNaN(minLat)) error.minLat = "Minimum latitude is invalid";
    else where.lat = {
      [Op.gte]: minLat
    };
  }
  if(maxLng){
    if(maxLng < minLng || maxLng < -180 || maxLng > 180 || isNaN(maxLng)) error.maxLng = "Minimum longitude is invalid";
    else where.lng = {
      [Op.lte]: maxLng
    };
  }
  if(minLng){
    if(minLng > maxLng || minLng < -180 || minLng > 180 || isNaN(minLng)) error.minLng = "Maximum longitude is invalid";
    else where.lng = {
      [Op.gte]: minLng
    };
  }
  if(minPrice){
    if(minPrice < 0 || isNaN(minPrice)) error.minPrice = "Minimum price must be greater than or equal to 0";
    else where.price = {
      [Op.gte]: minPrice
    };
  }
  if(maxPrice){
    if(maxPrice < 0 || isNaN(maxPrice)) error.maxPrice = "Maximum price must be greater than or equal to 0"
    else where.price = {
      [Op.lte]: maxPrice
    };
  }

  if(Object.keys(error).length) {
    const errors = {};
    if(error.page) errors.page = error.page;
    if(error.size) errors.size = error.size;
    if(error.maxLat) errors.maxLat = error.maxLat;
    if(error.minLat) errors.minLat = error.minLat;
    if(error.minLng) errors.minLng = error.minLng;
    if(error.maxLng) errors.maxLng = error.maxLng;
    if(error.minPrice) errors.minPrice = error.minPrice;
    if(error.maxPrice) errors.maxPrice = error.maxPrice;
    return res.status(403).json({
      message: "Bad Request",
      errors
    });
  }

  const limit = size;
  const offset = size * (page - 1);

  const spots = await Spot.findAll({
    where,
    include: [
      {
        model: Review,
      },
      {
        model: SpotImage,
      },
    ],
    order: ["id"],
    limit,
    offset
  });

  let spotsList = [];
  spots.forEach((spot) => {
    spotsList.push(spot.toJSON());
  });

  spotsList.forEach((spot) => {
    let sum = 0;
    let count = 0;

    spot.Reviews.forEach((review) => {
      sum += review.stars;
      count++;
    });

    spot.avgRating = parseFloat((sum / count).toFixed(1));
    if (isNaN(spot.avgRating)) spot.avgRating = 0;

    spot.SpotImages.forEach((image) => {
      if (image.preview) spot.previewImage = image.url;
    });

    if (!spot.previewImage) spot.previewImage = "Spot has no preview images";

    delete spot.Reviews;
    delete spot.SpotImages;
  });

  const Spots = {
    ["Spots"]: spotsList,
    page: page,
    size: size
  };

  res.status(200).json(Spots);
});

module.exports = router;
