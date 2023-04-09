import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { thunkGetReviewBySpotId } from "../../store/reviews";

const Reviews = ({spotId}) => {
  const dispatch = useDispatch();
  const reviews = useSelector(state => Object.values(state.reviews));
  console.log(reviews)

  useEffect(() => {
    dispatch(thunkGetReviewBySpotId(spotId))
  }, [dispatch, spotId]);

  const formatMonth = (reviewCreationDate) => {
    const creationDate = '';
    console.log(reviewCreationDate);
  }

  if(Object.keys(reviews).length > 0) {
    // console.log('RENDERING ALL REVIEWS FOR SPOT :', spotId);
    return (
      <div className='review-container'>
        {reviews.map(review =>
        <div className="review" key={review.id}>
          <h4>{review.User.firstName}</h4>
          <h5>{formatMonth(review.createdAt)}</h5>
        </div>
        )}
      </div>
    )
  }
}

export default Reviews;
