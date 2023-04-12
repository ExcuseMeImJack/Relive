import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteReview } from "../../store/reviews";

const DeleteReview = ({reviewId}) => {
  const dispatch = useDispatch();
  const {closeModal} = useModal();

  return (
    <div>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this review?</p>
      <button onClick={() => {
        dispatch(thunkDeleteReview(reviewId))
        closeModal();
      }}>Yes (Delete Review)</button>
      <button onClick={closeModal}>No (Keep Review)</button>
    </div>
  )
}

export default DeleteReview;
