import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteSpot, thunkGetAllSpots } from "../../store/spots";
import { useEffect } from "react";
import './spot-delete.css';

const DeleteModal = ({spotId}) => {
  const dispatch = useDispatch();
  const {closeModal} = useModal();

  const handleDelete = async () => {
    await dispatch(thunkDeleteSpot(spotId))
    closeModal();
  }

  useEffect(() => {
    dispatch(thunkGetAllSpots())
  }, [dispatch]);

  return (
    <div className="confirm-delete-modal-div">
      <div className="confirm-delete-text">
       <h2-semibold>Confirm Delete</h2-semibold>
      </div>
      <p>Are you sure you want to remove this spot from the listings?</p>
      <div className="confirm-delete-buttons">
        <button className='delete-modal-button changeCursor' onClick={() => handleDelete()}>Yes (Delete Spot)</button>
        <button className="close-modal-button changeCursor" onClick={() => closeModal()}>No (Keep Spot)</button>
      </div>
    </div>
  )
}

export default DeleteModal;
