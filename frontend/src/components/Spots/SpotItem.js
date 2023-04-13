// import { useDispatch } from "react-redux"
// import { thunkGetSpotById } from "../../store/spots";
// import { useEffect } from "react";
import LoadingScreen from '../LoadingScreen';
import './spots.css'
import { useHistory } from "react-router-dom";

const SpotItem = ({spot}) => {
  // const dispatch = useDispatch();
  const history = useHistory();

  const getSpotDetails = () => history.push(`/spots/${spot.id}`);

  return (
    <div title={spot.name} className="spot-card" onClick={getSpotDetails} >
      <div className="spot-image-container changeCursor">
        <img className="spot-image" src={spot.previewImage} alt={spot.name}/>
      </div>
      <div>
        <div className="spot-card-top">
          <p>{spot.city}, {spot.state}</p>
          <div className="spot-card-rating">
            <i className="fa-solid fa-star"></i>
            <p>{spot.avgRating === 0 ? 'New' : (spot.avgRating % 1 === 0 ? (spot.avgRating + '.0'): spot.avgRating)}</p>
          </div>
        </div>
        <p className="spot-card-bottom">${spot.price} night</p>
      </div>
    </div>
  )
}

export default SpotItem;
