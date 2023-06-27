import './booking-manage.css'
import { useHistory } from "react-router";
import BookingItem from "./BookingItem";
import OpenModalButton from "../OpenModalButton";
import UpdateBookingModal from './UpdateBookingModal';
import DeleteBookingModal from './DeleteBookingModal';
import Loading from '../Loading';
const { useEffect } = require("react");
const { useSelector, useDispatch } = require("react-redux");
const { thunkGetUserBookings } = require("../../store/bookings");

const BookingManagement = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currUser = useSelector((state) => state.session.user);
  const bookings = useSelector((state) => Object.values(state.bookings.bookings));

  useEffect(() => {
    dispatch(thunkGetUserBookings());
  }, [dispatch]);

  if(!bookings) return <Loading/>

  const currDate = new Date().getTime();

  const calDate = (booking) => {
    if (currDate >= new Date(booking.startDate).getTime() && currDate <= new Date(booking.endDate).getTime()){
      return
    }
    else if (currDate < new Date(booking.endDate).getTime()) {
      return (
        <div className="manage-buttons">
            <OpenModalButton
                cName="delete-button changeCursor"
                modalComponent={<UpdateBookingModal currBooking={booking} spotId={booking.spotId}/>}
                buttonText="Update"
              />
              <OpenModalButton
                cName="delete-button changeCursor"
                modalComponent={<DeleteBookingModal bookingId={booking.id}/>}
                buttonText="Delete"
              />
            </div>
      );
    } else {
      return (
        <div className="manage-buttons">
              <OpenModalButton
                cName="delete-button changeCursor"
                modalComponent={<DeleteBookingModal bookingId={booking.id}/>}
                buttonText="Delete Past Booking"
              />
            </div>

      );
    }
  };

  return (
    <div className="manage-spots-page">
      <div className="manage-bar manage-bookings-bar">
        <h2-semibold>Manage Your Bookings</h2-semibold>
        <button className="changeCursor" onClick={() => history.push('/')}>Book a New Spot</button>
      </div>
      <div className="landing-container">
        {bookings.map((booking) => (
          <div key={booking.id}>
            <BookingItem booking={booking} />
              {calDate(booking)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingManagement
