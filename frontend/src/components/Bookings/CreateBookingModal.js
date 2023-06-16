import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkGetSpotById } from "../../store/spots";
import { thunkCreateBooking, thunkGetSpotBookings } from "../../store/bookings";
import './bookings-create.css'

const CreateBookingModal = ({spotId, bookings}) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const {closeModal} = useModal();

  const currUser = useSelector(state => state.session.user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const err = {};
      bookings.forEach(booking => {
        const newBookingStartTime = new Date(startDate).getTime();
        const newBookingEndTime = new Date(endDate).getTime();
        const oldBookingStartTime = new Date(booking.startDate).getTime();
        const oldBookingEndTime = new Date(booking.endDate).getTime();

        if(newBookingEndTime <= newBookingStartTime) err.endDate = "Booking End cannot be on or before the Booking Start"

        if(newBookingStartTime >= oldBookingStartTime && newBookingStartTime <= oldBookingEndTime) err.startDate = "Booking Start conflicts with an existing booking"

        if(newBookingEndTime >= oldBookingStartTime && newBookingEndTime <= oldBookingEndTime) err.endDate = "Booking End conflicts with an existing booking"

        setErrors(err)
      })

    if(Object.values(errors).length < 1) {
      const newBookingInfo = {
        startDate,
        endDate
      }

      const newBooking = await dispatch(thunkCreateBooking(newBookingInfo, spotId));
      if (newBooking.errors) {
        setErrors(newBooking.errors);
      } else {
        closeModal();
        dispatch(thunkGetSpotBookings(spotId))
        dispatch(thunkGetSpotById(spotId));
        setErrors({});
        closeModal();
      }
      setErrors({});
    }
  }

  const currDate = new Date().toISOString().split("T")[0];

  return (
    <div className="create-booking-modal-div">

      <div className="create-booking-text">
        <h2-semibold>Plan your stay!</h2-semibold>
      </div>

      {errors.startDate && <p className={isSubmitted ? "errors-shown" : "errors-hidden"}>{errors.startDate}</p>}
      {errors.endDate && <p className={isSubmitted ? "errors-shown" : "errors-hidden"}>{errors.endDate}</p>}

      <form onSubmit={handleSubmit} className="booking-create-form">
        <div className="BookingCreateFormContainer">
          <div className="booking-start-date">
            <label>Booking Start:</label>
            <input type="date" name="startDate" value={startDate} min={currDate} onChange={(e) => {
                setStartDate(e.target.value)
                setErrors("")
            }}/>
          </div>
          <div className="booking-end-date">
            <label>Booking End:</label>
            <input type="date" name="endDate" value={endDate} min={startDate || currDate} onChange={(e) => {
              setEndDate(e.target.value)
              setErrors("")
            }}/>
          </div>
        </div>
        <button
          className={
            Object.values(errors).length > 0 || (startDate === '' || endDate === '')
              ? "login-button-invalid create-booking-button"
              : "login-button-valid changeCursor create-booking-button"
          }
          type="submit"
          disabled={Object.values(errors).length > 0 || (startDate === '' || endDate === '')}
        >
          Create Your Booking!
        </button>
      </form>
    </div>
  )
}

export default CreateBookingModal;
