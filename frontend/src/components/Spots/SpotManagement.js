import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllSpots } from "../../store/spots";
import SpotItem from "./SpotItem";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from '../DeleteSpot'
import { useHistory } from "react-router";
import './spots.css'
import './spot-manage.css'
import Loading from "../Loading";

const SpotManagement = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currUser = useSelector(state => state.session.user);
  const spots = useSelector(state => Object.values(state.spots));
  let currUserSpots = [];

  useEffect(() => {
    dispatch(thunkGetAllSpots())
  }, [dispatch]);

  spots.forEach(spot => {
    if (spot.ownerId === currUser.id) currUserSpots.push(spot);
  });

  if(!spots) return <Loading/>

  return (
   <div className="manage-spots-page">
      <div className="manage-bar">
        <h2-semibold>Manage Your Spots</h2-semibold>
        <button className="changeCursor" onClick={() => history.push('/spots/new')}>Create a New Spot</button>
      </div>
      <div className="landing-container">
        {currUserSpots.map(spot =>
        <div key={spot.id}>
          <SpotItem spot={spot} />
          <div className="manage-buttons">
            <button className="update-button changeCursor" onClick={() => history.push(`/spots/${spot.id}/edit`)}>Update</button>
            <OpenModalButton
              cName="delete-button changeCursor"
              modalComponent={<DeleteModal spotId={spot.id}/>}
              buttonText="Delete"
            />
          </div>
        </div>
        )}

      </div>

   </div>

  )
}

export default SpotManagement;
