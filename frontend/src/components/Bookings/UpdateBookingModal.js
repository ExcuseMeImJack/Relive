import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkGetSpotById } from "../../store/spots";
import {
  thunkCreateBooking,
  thunkDeleteBookingById,
  thunkGetBookingById,
  thunkGetSpotBookings,
  thunkGetUserBookings,
  thunkUpdateBookingById,
} from "../../store/bookings";
import "./bookings-create.css";

const UpdateBookingModal = ({ bookings, currBooking, spotId }) => {
  const dispatch = useDispatch();
  const [oldStart, setOldStart] = useState(currBooking.startDate);
  const [oldEnd, setOldEnd] = useState(currBooking.endDate);
  const [startDate, setStartDate] = useState(currBooking.startDate);
  const [endDate, setEndDate] = useState(currBooking.endDate);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { closeModal } = useModal();
  const spotBookings = useSelector(state => Object.values(state.bookings.spotBookings))

  useEffect(() => {
    dispatch(thunkGetSpotBookings(spotId))
  }, [dispatch])

  useEffect(() => {
    const err = {};

    const allBookings = spotBookings.filter(booking => booking.id !== currBooking.id)

    allBookings.forEach((booking) => {
      const newBookingStartTime = new Date(startDate).getTime();
      const newBookingEndTime = new Date(endDate).getTime();
      const oldBookingStartTime = new Date(booking.startDate).getTime();
      const oldBookingEndTime = new Date(booking.endDate).getTime();

      if (newBookingEndTime <= newBookingStartTime)
        err.endDate = "Booking End cannot be on or before the Booking Start";

      if (
        newBookingStartTime >= oldBookingStartTime &&
        newBookingStartTime <= oldBookingEndTime
      )
        err.startDate = "Booking Start conflicts with an existing booking";

      if (
        newBookingEndTime >= oldBookingStartTime &&
        newBookingEndTime <= oldBookingEndTime
      )
        err.endDate = "Booking End conflicts with an existing booking";
      setErrors(err);
    });
  }, [startDate, endDate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (Object.values(errors).length < 1) {
      const updatedBookingInfo = {
        startDate,
        endDate,
      };
      const updatedBooking = await dispatch(
        thunkUpdateBookingById(updatedBookingInfo, currBooking.id)
      );
      await dispatch(thunkGetUserBookings());
      if (updatedBooking.errors) {
        setErrors(updatedBooking.errors);
      } else {
        closeModal();
        await dispatch(thunkGetUserBookings())
        // await dispatch(thunkGetSpotById(spotId));
        setErrors({});
        closeModal();
      }
      setErrors({});
    }
  };

  const currDate = new Date().toISOString().split("T")[0];

  return (
    <div className="create-booking-modal-div">
      <div className="create-booking-text">
        <h2-semibold>
          Update your booking at {currBooking.Spot.name}
        </h2-semibold>
      </div>

      {errors.startDate && (
        <p className={errors.startDate ? "errors-shown" : "errors-hidden"}>
          {errors.startDate}
        </p>
      )}
      {errors.endDate && (
        <p className={errors.endDate ? "errors-shown" : "errors-hidden"}>
          {errors.endDate}
        </p>
      )}

      <form onSubmit={handleSubmit} className="booking-create-form">
        <div className="BookingCreateFormContainer">
          <div className="booking-start-date">
            <label>Booking Start:</label>
            <input
              type="date"
              name="startDate"
              value={new Date(startDate).toISOString().substr(0, 10)}
              min={currDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setErrors("");
              }}
            />
          </div>
          <div className="booking-end-date">
            <label>Booking End:</label>
            <input
              type="date"
              name="endDate"
              value={new Date(endDate).toISOString().substr(0, 10)}
              min={startDate || currDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setErrors("");
              }}
            />
          </div>
        </div>
        <button
          className={
            Object.values(errors).length > 0 ||
            (new Date(startDate).getTime() === new Date(oldStart).getTime()  &&
              new Date(endDate).getTime()  === new Date(oldEnd).getTime())
              ? "login-button-invalid create-booking-button"
              : "login-button-valid changeCursor create-booking-button"
          }
          type="submit"
          disabled={
            Object.values(errors).length > 0 ||
            (new Date(startDate).getTime() === new Date(oldStart).getTime()  &&
              new Date(endDate).getTime()  === new Date(oldEnd).getTime())
          }
        >
          Update Your Booking!
        </button>
      </form>
    </div>
  );
};

export default UpdateBookingModal;
