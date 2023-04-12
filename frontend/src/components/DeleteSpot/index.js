import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteSpot } from "../../store/spots";

const DeleteModal = ({spotId}) => {
  const dispatch = useDispatch();
  const {closeModal} = useModal();

  return (
    <div>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot from the listings?</p>
      <button onClick={() => {
        dispatch(thunkDeleteSpot(spotId))
        closeModal();
      }}>Yes (Delete Spot)</button>
      <button onClick={closeModal}>No (Keep Spot)</button>
    </div>
  )
}

export default DeleteModal;
