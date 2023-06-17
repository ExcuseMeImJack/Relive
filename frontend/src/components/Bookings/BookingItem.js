import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { thunkGetAllSpots } from "../../store/spots";
import Loading from "../Loading";

const BookingItem = ({ booking }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const spots = useSelector(state => Object.values(state.spots));

  if (!booking.Spot || !booking) return <Loading />;

  const getSpotDetails = () => history.push(`/spots/${booking.Spot.id}`);
  const currDate = new Date().getTime();

  const calDate = () => {
    if (currDate < new Date(booking.startDate).getTime()) {
      return (
        <div className="spot-card-top bookings-card-top">
          <div>
            <p>Booking Start Date: </p>
            <p className="startDate">{booking.startDate.split("T")[0]}</p>
          </div>
          <div>
            <p>Booking End Date: </p>
            <p className="endDate">{booking.endDate.split("T")[0]}</p>
          </div>
        </div>
      );
    } else {
      return <div className="spot-card-top bookings-card-top">
            <div>
              <p id="passed-booking">Booking Has Passed</p>
            </div>
          </div>
    }
  };

  return (
    <div
      title={booking.Spot.name}
      className="spot-card changeCursor"
      onClick={getSpotDetails}
    >
      <div className="changeCursor" onClick={getSpotDetails}>
        <div className="spot-image-container">
          <img
            className="spot-image"
            src={booking.Spot.previewImage}
            alt={booking.Spot.name}
          />
        </div>
        <div>
          {calDate()}
          </div>
      </div>
    </div>
  );
};

export default BookingItem;
