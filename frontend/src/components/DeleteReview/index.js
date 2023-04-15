import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteReview, thunkGetReviewBySpotId } from "../../store/reviews";
import { thunkGetSpotById } from "../../store/spots";


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
    <div className="confirm-delete-modal-div">
      <div className="confirm-delete-text">
       <h2-semibold>Confirm Delete</h2-semibold>
      </div>
      <p>Are you sure you want to delete this review?</p>
      <div className="confirm-delete-buttons">
        <button className='delete-modal-button changeCursor' onClick={handleSubmit}>Yes (Delete Review)</button>
        <button className="close-modal-button changeCursor" onClick={closeModal}>No (Keep Review)</button>
      </div>
    </div>
  )
}

export default DeleteReview;
