const express = require("express");
const { Spot, SpotImage, Review, User, ReviewImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

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

      if (!spot.previewImage) spot.previewImage = "Spot has no images";

      delete spot.Reviews;
      delete spot.SpotImages;
  });
  const Spots = { ["Spots"]: spotsList };

  res.status(200).send(Spots);
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

    res.send(newSpotImageModified);
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

  res.send(spot);
});

// Delete a Spot
router.delete("/:spotId", [requireAuth], async (req, res) => {
  if ((await doesSpotExist(req.params.spotId)) === false) return res.status(404).json({ message: "Spot couldn't be found" });

  const { user } = req;

  const spot = await Spot.findByPk(req.params.spotId);

  if (user.id === spot.ownerId) {
    await spot.destroy();
    return res.status(200).send({ message: "Successfully deleted" });
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

      res.status(200).send(updatedSpot);
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

    res.status(201).send(newSpot);
  }
});

// Get all Spots
router.get("/", async (req, res) => {
  const spots = await Spot.findAll({
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

    if (!spot.previewImage) spot.previewImage = "Spot has no images";

    delete spot.Reviews;
    delete spot.SpotImages;
  });

  const Spots = { ["Spots"]: spotsList };

  res.status(200).send(Spots);
});

module.exports = router;
