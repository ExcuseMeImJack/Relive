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
    let reviewMonth;
    // [2023-04-08, T16:44:02.000Z]
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

  if(Object.keys(reviews).length > 0) {
    // console.log('RENDERING ALL REVIEWS FOR SPOT :', spotId);
    return (
      <div className='review-container'>
        {reviews.map(review =>
        <div className="review" key={review.id}>
          <h4>{review.User.firstName}</h4>
          <h5>{formatMonth(review.createdAt)}</h5>
          <p>{review.review}</p>
        </div>
        )}
      </div>
    )
  }
}

export default Reviews;
