import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { thunkGetReviewBySpotId } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import DeleteReview from "../DeleteReview";
import './reviews.css'

const Reviews = ({spotId}) => {
  const dispatch = useDispatch();
  const reviews = useSelector(state => Object.values(state.reviews));
  const currUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(thunkGetReviewBySpotId(spotId))
  }, [dispatch, spotId]);

  const formatMonth = (reviewCreationDate) => {
    let reviewMonth;
    // [2023-04-08T16:44:02.000Z]
    // [2023, 04, 08]
    const date = reviewCreationDate.split('T')[0].split('-');
    const month = date[1];
    const year = date[0];

    const months = {
      '01': "January",
      '02': "February",
      '03': "March",
      '04': "April",
      '05': "May",
      '06': "June",
      '07': "July",
      '08': "August",
      '09': "September",
      '10': "October",
      '11': "November",
      '12': "December"
    };

    for(let monthNum in months){
      if(month === monthNum) {
        reviewMonth = months[monthNum];
      }
    }

    return `${reviewMonth} ${year}`
  }

  reviews.sort((a, b) => {

    const createdAtA = new Date(a.createdAt).getTime();
    const createdAtB = new Date(b.createdAt).getTime();

    if (createdAtA > createdAtB) {
      return -1;
    }
    if (createdAtA < createdAtB) {
      return 1;
    }
    return 0;
  })
  if(Object.keys(reviews).length > 0) {
    // console.log('RENDERING ALL REVIEWS FOR SPOT :', spotId);
    return (
      <div className='review-container'>
        {reviews.map(review =>
        <div className="review" key={review.id}>
          <h5 className="review-user">{review.User.firstName}</h5>
          <p className="date-subheading review-date">{formatMonth(review.createdAt)}</p>
          <p className="review-text">{review.review}</p>
          {currUser && (currUser.id === review.User.id) &&
          <OpenModalButton
            cName={'delete-review-button changeCursor'}
            modalComponent={<DeleteReview reviewId={review.id} spotId={spotId}/>}
            buttonText="Delete"
          />}
        </div>
        )}
      </div>
    )
  }
}

export default Reviews;
