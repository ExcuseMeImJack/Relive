import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useEffect } from "react";
import { thunkDeleteBookingById, thunkGetSpotBookings, thunkGetUserBookings } from "../../store/bookings";
import { thunkGetSpotById } from "../../store/spots";

const DeleteBookingModal = ({bookingId}) => {
  const dispatch = useDispatch();
  const {closeModal} = useModal();

  const handleDelete = async () => {
    await dispatch(thunkDeleteBookingById(bookingId))

    closeModal();
  }

  return (
    <div className="confirm-delete-modal-div">
      <div className="confirm-delete-text">
       <h2-semibold>Confirm Delete</h2-semibold>
      </div>
      <p>Are you sure you want to remove this booking?</p>
      <div className="confirm-delete-buttons">
        <button className='delete-modal-button changeCursor' onClick={() => handleDelete()}>Yes (Delete Booking)</button>
        <button className="close-modal-button changeCursor" onClick={() => closeModal()}>No (Keep Booking)</button>
      </div>
    </div>
  )
}

export default DeleteBookingModal;
