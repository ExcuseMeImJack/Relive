const express = require("express");
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async(req, res) => {
  const {user} = req;
    if(user){
      const userBookings = await Booking.findAll({where: {userId: user.id}});

      const booking = await Booking.findAll({
        where: { userId: user.id },
        attributes: ['id', 'spotId'],
        include: [
          {
            model: Spot,
            attributes: {exclude:['description', 'createdAt', 'updatedAt']},
            include:
            {
              model: SpotImage
            }
          },
        ],
        order: ["id"],
      });

      let bookingsList = [];
      booking.forEach((booking) => {
        bookingsList.push(booking.toJSON());
      });

      bookingsList.forEach((booking) => {

        booking.Spot.SpotImages.forEach((image) => {
          if (image.preview) booking.Spot.previewImage = image.url;
        });

        if (!booking.Spot.previewImage) booking.Spot.previewImage = "Spot has no preview images";

        delete booking.Reviews;
        delete booking.Spot.SpotImages;

        userBookings.forEach(userBooking => {
          if(userBooking.id === booking.id) {
            booking.userId = userBooking.userId;
            booking.startDate = userBooking.startDate.toISOString().replace('T', '').replace('Z', '').replace('00:00:00.000', '');
            booking.endDate = userBooking.endDate.toISOString().replace('T', '').replace('Z', '').replace('00:00:00.000', '');
            booking.createdAt = userBooking.createdAt;
            booking.updatedAt = userBooking.updatedAt;
          }
        })

    });
    res.status(200).json({['Bookings']: bookingsList})
  }
});
// const my_model = await MyModel.findById(id, {
//   include: [
//     {
//       model: AnotherModel,
//       attributes: [ 'displayName', 'email' ] // only these attributes returned
//     },
//     { model: YetAnotherModel,
//       include: [{
//         model: AnotherModel,
//         attributes: [ 'id', 'displayName', 'email' ]
//       }]
//     }
//   ]
// })

// My preferred method of doing this is to use the getTime method on date objects.  This returns a number, the number of milliseconds since a specific date about 50 years ago.  You can use this number to compare against the value for other date objects, and if the number is the same, the dates are the same.

module.exports = router;
