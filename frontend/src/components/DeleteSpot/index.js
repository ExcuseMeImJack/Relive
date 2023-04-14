import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteSpot, thunkGetAllSpots } from "../../store/spots";
import { useEffect } from "react";

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
    <div>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot from the listings?</p>
      <button onClick={() => handleDelete()}>Yes (Delete Spot)</button>
      <button onClick={() => closeModal()}>No (Keep Spot)</button>
    </div>
  )
}

export default DeleteModal;
