import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteReview, thunkGetReviewBySpotId } from "../../store/reviews";
import { thunkGetAllSpots, thunkGetSpotById } from "../../store/spots";

const DeleteReview = ({reviewId, spotId}) => {
  const dispatch = useDispatch();
  const {closeModal} = useModal();

  return (
    <div>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this review?</p>
      <button onClick={() => {
        dispatch(thunkDeleteReview(reviewId))
        dispatch(thunkGetReviewBySpotId(spotId))
        dispatch(thunkGetSpotById(spotId))
        dispatch(thunkGetAllSpots())
        closeModal();
      }}>Yes (Delete Review)</button>
      <button onClick={closeModal}>No (Keep Review)</button>
    </div>
  )
}

export default DeleteReview;
