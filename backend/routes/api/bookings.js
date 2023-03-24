const express = require("express");
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
  const {user} = req;
  const bookingUserId = await Booking.findByPk(req.params.bookingId);

  if(!bookingUserId) return res.status(404).json({ message: "Booking couldn't be found" });

  const spotOwnerId = await Spot.findByPk(bookingUserId.spotId);

  const today = new Date();
  const currTime = today.getTime();
  if(currTime > bookingUserId.startDate.getTime()) res.status(403).json({ message: "Bookings that have been started can't be deleted" });

  if(bookingUserId.userId === user.id || spotOwnerId.ownerId === user.id){
    await bookingUserId.destroy();
    res.status(200).json({message: "Successfully deleted"})
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
})

// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
  const {user} = req;
  const booking = await Booking.findByPk(req.params.bookingId);
  if(!booking) return res.status(404).json({ message: "Review couldn't be found" });

  if(booking.userId === user.id) {
    const {startDate, endDate} = req.body;

    const modifiedBooking = await booking.update({
      startDate,
      endDate
    })

    res.json(modifiedBooking);
  } else {
    res.status(403).json({ message: "Forbidden" });
  }

});

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
            booking.startDate = userBooking.startDate;
            booking.endDate = userBooking.endDate;
            booking.createdAt = userBooking.createdAt;
            booking.updatedAt = userBooking.updatedAt;
          }
        })

    });
    res.status(200).json({['Bookings']: bookingsList})
  }
});


// My preferred method of doing this is to use the getTime method on date objects.  This returns a number, the number of milliseconds since a specific date about 50 years ago.  You can use this number to compare against the value for other date objects, and if the number is the same, the dates are the same.

module.exports = router;
