import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { thunkGetSpotById } from "../../store/spots";
import './spots.css'
import './spot-details.css'
import Reviews from "../Reviews/index";
import ReviewFormModal from "../ReviewFormModal";
import OpenModalButton from "../OpenModalButton";
import { thunkGetReviewBySpotId } from "../../store/reviews";
import CreateBookingModal from "../Bookings/CreateBookingModal";
import LoginFormModal from "../LoginFormModal"
import { thunkGetSpotBookings } from "../../store/bookings";
import { useHistory } from "react-router";
import Loading from "../Loading";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const SpotDetails = () => {
  const {spotId} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const reviews = useSelector(state => Object.values(state.reviews));
  const spots = useSelector(state => Object.values(state.spots));
  const spot = spots.find(spot => spot.id === parseInt(spotId));
  const currUser = useSelector(state => state.session.user)
  const bookings = useSelector(state => Object.values(state.bookings.spotBookings))

  useEffect(() => {
    dispatch(thunkGetSpotById(spotId));
    dispatch(thunkGetReviewBySpotId(spotId))
  }, [dispatch, spotId]);

  useEffect(() => {

    if(currUser ) {
        dispatch(thunkGetSpotBookings(spotId));
    }
  }, [dispatch, currUser])


  if(!spot) return <Loading/>;
  if(!spot.SpotImages) return <Loading/>
  if(!bookings) return <Loading/>

  let reviewUsers = [];

  reviews.forEach(review => {
    reviewUsers.push(review.User.id);
  })

  const handleBookingButton = () => {
    const preExistingBooking = bookings.find(booking => booking.spotId === +spotId && booking.userId === currUser.id);
    // const preExistingBooking = bookings.find(booking => {
    //   if(booking.spotId === +spotId){
    //     if(booking.userId === currUser.id) return true
    //     else return false
    //   } else return false
    // });
    if(preExistingBooking && spot.id === +spotId) {
      return <button className="reserve-button changeCursor"  onClick={() => history.push('/bookings/current')}>Booking already made!</button>
    } else if (spot.ownerId === currUser.id){
      return <button className="reserve-button changeCursor"  onClick={() => history.push('/bookings/current')}>You can't book your own spot!</button>
    } else {
      return <OpenModalButton
            modalComponent={<CreateBookingModal spotId={spotId} bookings={bookings}/>}
            cName="reserve-button changeCursor"
            buttonText="Reserve"
           />
    }

  }

  return (
    <div className="details-flex">
      <div className="getSpotDetails">
      <h1>{spot.name}</h1>
      <h3>{spot.city}, {spot.state}, {spot.country}</h3>
        <div className="image-grid-container">
          {spot.SpotImages.map((spotImg, i )=> (
            spotImg.preview ?
            <img src={spotImg.url} key={spotImg.id} alt="preview img" className="previewImage"/>
            :
            <img src={spotImg.url} key={spotImg.id} alt="not preview img" className={`spotImage${i}`}/>
          ))}
        </div>
      <div className="overview-section">
        <div className="description">
          <h2>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h2>
          <p>{spot.description}</p>
        </div>
        <div className={spot.avgStarRating === 0 ? 'book-spot reserve-box-height-new' : 'book-spot reserve-box-height-existing'}>
          <div className="book-spot-top">
            <div className="info">
              <h3>${spot.price}</h3>
              <p>night</p>
            </div>
            <div className={spot.avgStarRating === 0 ? 'new' : spot.avgStarRating === 1 ? 'one' : 'multiple'}>
            <i className="fa-solid fa-star"></i>
              <div>
                <h3>{spot.avgStarRating === 0 ? 'New' : (spot.avgStarRating % 1 === 0 ? (spot.avgStarRating + '.0'): spot.avgStarRating)} </h3>
              </div>
              {spot.numReviews === 1 &&
              <div className="one-review">
                <h4 className="dot"> · </h4>
                <p>{spot.numReviews} review</p>
              </div>
              }
              {spot.numReviews > 1 &&
              <div className="multiple-reviews">
                <h4 className="dot"> · </h4>
                <p>{spot.numReviews} reviews</p>
              </div>
              }
            </div>
          </div>
          {currUser ?
            handleBookingButton()
           : <OpenModalButton
           modalComponent={<LoginFormModal />}
            cName="reserve-button changeCursor"
            buttonText="Sign In To Reserve"
           />
           }

        </div>
      </div>
      <div className="divider-review-top"></div>
      <div className="reviews-div">
        <div className="reviews-overall">
        <div className={spot.avgStarRating === 0 ? 'reviews-new' : spot.avgStarRating === 1 ? 'reviews-one' : 'reviews-multiple'}>
            <i className="fa-solid fa-star"></i>
              <div className="rating-num">
                <h4>{spot.avgStarRating === 0 ? 'New' : (spot.avgStarRating % 1 === 0 ? (spot.avgStarRating + '.0'): spot.avgStarRating)} </h4>
              </div>
              {spot.numReviews === 1 &&
              <div className="reviews-suffix-one">
                <h4 className="dot"> · </h4>
                <h4>{spot.numReviews} review</h4>
              </div>
              }
              {spot.numReviews > 1 &&
              <div className="reviews-suffix-multiple">
                <h4 className="dot"> · </h4>
                <h4>{spot.numReviews} reviews</h4>
              </div>
              }
            </div>
          {currUser && (currUser.id !== spot.ownerId && !reviewUsers.includes(currUser.id)) &&
          <div className="review-post-div">
            <OpenModalButton
              cName="review-post-button changeCursor"
              modalComponent={<ReviewFormModal spotId={spotId} />}
              buttonText="Post Your Review"
              // add more stuff here if needed
            />
          </div>
          }
          {currUser && (!spot.numReviews && (currUser.id !== spot.ownerId && !reviewUsers.includes(currUser.id)))  && <p>Be the first to post a review!</p>}
        </div>
        <div className="reviews">
          <Reviews spotId={spotId}/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SpotDetails;
