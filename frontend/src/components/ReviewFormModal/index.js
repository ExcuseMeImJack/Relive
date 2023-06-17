import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateReview } from "../../store/reviews";
import "./ReviewForm.css";
import { thunkGetSpotById } from "../../store/spots";
// import { useHistory } from "react-router";
// import spotsReducer from "../../store/spots";

const ReviewFormModal = ({ spotId }) => {
  // const history = useHistory();
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const [isFilled, setIsFilled] = useState('empty');
  const { closeModal } = useModal();
  const currUser = useSelector((state) => state.session.user);

  useEffect(() => {
    const err = {};
    if (rating < 1) err.rating = "Star Rating must be atleast 1 star.";
    if (review.length < 10)
      err.review = "Review must have atleast 10 characters.";
    setErrors(err);
  }, [rating, review]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (Object.values(errors).length < 1) {
      const newReviewInfo = {
        User: {
          firstName: currUser.firstName,
          lastName: currUser.lastName,
          id: currUser.id,
        },
        review,
        stars: rating,
      };

      const newReview = await dispatch(
        thunkCreateReview(newReviewInfo, spotId)
      );
      const r = newReview;

      if (r.errors) {
        setServerErrors(r.errors);
      } else {
        closeModal();
        await dispatch(thunkGetSpotById(spotId));

        // await dispatch(thunkGetReviewBySpotId(spotId))
        // console.log('GOT REVIEW')

        // await dispatch(thunkGetAllSpots())
        // console.log("GOT ALL SPOTS")
        setErrors({});
      }
      setErrors({});
    }
  };

  // const checkIfFilled = () => {

  // }

  return (
    <div className="create-review-modal-div">
      <div className="create-review-text">
        <h2-semibold>How was your stay?</h2-semibold>
      </div>
      {errors.rating && (
        <p className={isSubmitted ? "errors-shown" : "errors-hidden"}>
          {errors.rating}
        </p>
      )}
      {errors.review && (
        <p className={isSubmitted ? "errors-shown" : "errors-hidden"}>
          {errors.review}
        </p>
      )}
      {serverErrors.errors && (
        <p className="errors-shown">{serverErrors.errors}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="ReviewCreateFormContainer">
          {errors.review && (
            <p className="errors-shown-removepadding">{errors.review}</p>
          )}
          <textarea
            onChange={(e) => setReview(e.target.value)}
            value={review}
            placeholder="Leave your review here..."
          ></textarea>
          <div className="rating-input"></div>
          {/* fa-regular fa-star star */}
          {/* fa-solid fa-star star */}
          {errors.rating && (
            <p className="errors-shown-removepadding">{errors.rating}</p>
          )}
          <div className="create-review-div">
            <button
              type="button"
              className={hoverRating >= 1 || rating >= 1 ? "filled" : "empty"}
              onMouseEnter={() => setHoverRating(1)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(1)}
            >
              <i
                className={
                  hoverRating >= 1 || rating >= 1
                    ? "fa-solid fa-star star changeCursor"
                    : "fa-regular fa-star star changeCursor"
                }
              ></i>
            </button>
            <button
              type="button"
              className={hoverRating >= 2 || rating >= 2 ? "filled" : "empty"}
              onMouseEnter={() => setHoverRating(2)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(2)}
            >
              <i
                className={
                  hoverRating >= 2 || rating >= 2
                    ? "fa-solid fa-star star changeCursor"
                    : "fa-regular fa-star star changeCursor"
                }
              ></i>
            </button>
            <button
              type="button"
              className={hoverRating >= 3 || rating >= 3 ? "filled" : "empty"}
              onMouseEnter={() => setHoverRating(3)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(3)}
            >
              <i
                className={
                  hoverRating >= 3 || rating >= 3
                    ? "fa-solid fa-star star changeCursor"
                    : "fa-regular fa-star star changeCursor"
                }
              ></i>
            </button>
            <button
              type="button"
              className={hoverRating >= 4 || rating >= 4 ? "filled" : "empty"}
              onMouseEnter={() => setHoverRating(4)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(4)}
            >
              <i
                className={
                  hoverRating >= 4 || rating >= 4
                    ? "fa-solid fa-star star changeCursor"
                    : "fa-regular fa-star star changeCursor"
                }
              ></i>
            </button>
            <button
              type="button"
              className={hoverRating >= 5 || rating >= 5 ? "filled" : "empty"}
              onMouseEnter={() => setHoverRating(5)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(5)}
            >
              <i
                className={
                  hoverRating >= 5 || rating >= 5
                    ? "fa-solid fa-star star changeCursor"
                    : "fa-regular fa-star star changeCursor"
                }
              ></i>
            </button>
            <p>Stars</p>
          </div>
        </div>
        <button
          className={
            Object.values(errors).length > 0
              ? "login-button-invalid"
              : "login-button-valid changeCursor"
          }
          type="submit"
          disabled={Object.values(errors).length > 0}
        >
          Submit Your Review
        </button>
      </form>
    </div>
  );
};
export default ReviewFormModal;
