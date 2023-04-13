import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteReview, thunkGetReviewBySpotId } from "../../store/reviews";
import { thunkGetAllSpots, thunkGetSpotById } from "../../store/spots";
import { useEffect } from "react";

const DeleteReview = ({reviewId, spotId}) => {
  const dispatch = useDispatch();
  const {closeModal} = useModal();

  const handleSubmit = async () => {
    await dispatch(thunkDeleteReview(reviewId))
    await dispatch(thunkGetReviewBySpotId(spotId))
    await dispatch(thunkGetSpotById(spotId))
    closeModal();
  }

  return (
    <div>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this review?</p>
      <button onClick={handleSubmit}>Yes (Delete Review)</button>
      <button onClick={closeModal}>No (Keep Review)</button>
    </div>
  )
}

export default DeleteReview;
