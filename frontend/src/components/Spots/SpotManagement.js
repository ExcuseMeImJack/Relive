import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllSpots } from "../../store/spots";
import SpotItem from "./SpotItem";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from '../DeleteSpot'
import { useHistory } from "react-router";

const SpotManagement = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currUser = useSelector(state => state.session.user);
  const spots = useSelector(state => Object.values(state.spots));
  let currUserSpots = [];

  useEffect(() => {
    dispatch(thunkGetAllSpots())
  }, [dispatch]);

  if(!currUser) return <h1>You are not logged in!</h1>;

  spots.forEach(spot => {
    if (spot.ownerId === currUser.id) currUserSpots.push(spot);
  });

  console.log(currUserSpots)


  return (
   <div className="manage-spots-page">
      <div className="manage-bar">
        <h2>Manage Spots</h2>
        {currUserSpots.length === 0 && <button onClick={() => history.push('/spots/new')}>Create a New Spot</button>}
      </div>
      <div className="spots-div">
        {currUserSpots.map(spot =>
        <div key={spot.id}>
          <SpotItem spot={spot} />
          <button className="update-button" onClick={() => history.push(`/spots/${spot.id}/edit`)}>Update</button>
          <OpenModalButton
            modalComponent={<DeleteModal spotId={spot.id}/>}
            buttonText="Delete"
          />
        </div>
        )}

      </div>

   </div>

  )
}

export default SpotManagement;
