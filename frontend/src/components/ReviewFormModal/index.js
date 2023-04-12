import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateReview } from "../../store/reviews";
import './ReviewForm.css'
// import { useHistory } from "react-router";
// import spotsReducer from "../../store/spots";

const ReviewFormModal = ({spotId}) => {
  // const history = useHistory();
  const dispatch = useDispatch();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {closeModal} = useModal();

  useEffect(() => {
    const err ={};
    if(rating < 1) err.rating = "Star Rating must be atleast 1 star."
    if(review.length < 9) err.review = "Review must have atleast 10 characters."
    setErrors(err);
  }, [rating, review]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if(Object.values(errors).length < 1){
      const newReviewInfo = {
        review,
        stars: rating
      }
      console.log('server error 22323232')
      const newReview = await dispatch(thunkCreateReview(newReviewInfo, spotId))
      const r = newReview;
      console.log(r)

      if(r.errors){
        setServerErrors(r.errors)
      } else {
        closeModal();
        window.location.reload();
      }

      setErrors({});
      setIsSubmitted(false);
      console.log(serverErrors)
    }
  }

  return (
    <div className="create-review-modal-div">
      <h2>How was your stay?</h2>
      {errors.rating && <p className={isSubmitted ? 'errors-shown' : 'errors-hidden'}>{errors.rating}</p>}
      {errors.review && <p className={isSubmitted ? 'errors-shown' : 'errors-hidden'}>{errors.review}</p>}
      {serverErrors.errors && <p className="errors-shown">{serverErrors.errors}</p>}
      <form onSubmit={handleSubmit}>
        <textarea onChange={(e) => setReview(e.target.value)} value={review} placeholder="Leave your review here..."></textarea>
        <div className="rating-input">
        </div>
        <div className="create-review-div">
          <button type="button" className={hoverRating >= 1 || rating >= 1 ? 'filled' : 'empty'} onMouseEnter={() => setHoverRating(1)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(1)}>
            <i className="fa-solid fa-star star"></i>
          </button>
          <button type="button" className={hoverRating >= 2 || rating >= 2 ? 'filled' : 'empty'} onMouseEnter={() => setHoverRating(2)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(2)}>
            <i className="fa-solid fa-star star"></i>
          </button>
          <button type="button" className={hoverRating >= 3 || rating >= 3 ? 'filled' : 'empty'} onMouseEnter={() => setHoverRating(3)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(3)}>
            <i className="fa-solid fa-star star"></i>
          </button>
          <button type="button" className={hoverRating >= 4 || rating >= 4 ? 'filled' : 'empty'} onMouseEnter={() => setHoverRating(4)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(4)}>
            <i className="fa-solid fa-star star"></i>
          </button>
          <button type="button" className={hoverRating >= 5 || rating >= 5 ? 'filled' : 'empty'} onMouseEnter={() => setHoverRating(5)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(5)}>
            <i className="fa-solid fa-star star"></i>
          </button>
          <p>Stars</p>
        </div>
        <button type="submit" disabled={Object.values(errors).length > 0}>Submit Your Review</button>
      </form>
    </div>
  )
}
export default ReviewFormModal;
