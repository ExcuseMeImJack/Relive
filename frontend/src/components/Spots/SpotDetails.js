import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { thunkGetSpotById } from "../../store/spots";
import './spots.css'

const SpotDetails = () => {
  const {spotId} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetSpotById(spotId));
  }, [dispatch, spotId]);

  const handleBooking = () => {
    alert('Feature Coming Soon...')
  }

  const spots = useSelector(state => Object.values(state.spots));
  const spot = spots.find(spot => spot.id === parseInt(spotId));

  if(!spot) return null;
  console.log(spot)

  return (
    <div className="getSpotDetails">
      <h2>{spot.name}</h2>
      <h3>{spot.city}, {spot.state}, {spot.country}</h3>
        <div className="images">
          {spot.SpotImages?.map(spotImg => (
            spotImg.preview ?
            <div className="previewImage"><img src={spotImg.url} alt="preview img" /></div>
            :
            <div className="spotImages"><img src={spotImg.url} alt="not preview img" /></div>
          ))}
        </div>
      <div>
        <div className="description">
          <h3>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h3>
          <p>{spot.description}</p>
        </div>
        <div className="book-spot">
          <h3>${spot.price} night</h3>
          <i className="fa-solid fa-star"></i>
          <h3>{spot.avgStarRating === 0 ? 'New' : spot.avgStarRating}</h3>
          <h3>{spot.numReviews} reviews</h3>
          <button onClick={handleBooking}>Reserve</button>
        </div>
      </div>
      <div>
        <i className="fa-solid fa-star"></i>
        <h3>{spot.avgStarRating === 0 ? 'New' : spot.avgStarRating}</h3>
        <h3>{spot.numReviews} reviews</h3>
        <div className="reviews">
          {/* IMPLEMENT GET REVIEWS OF SPOT ID */}
          <h3>REVIEWS COMING SOON!</h3>
        </div>
      </div>
    </div>
  )
}

export default SpotDetails;
