import { useParams } from "react-router";
import SpotForm from "./SpotForm";
import { useSelector } from "react-redux";

const SpotUpdate = () => {
  const {spotId} = useParams();
  const spots = useSelector(state => Object.values(state.spots));
  const spot = spots.find(spot => spot.id === parseInt(spotId));

   return (
    <SpotForm
      spot={spot}
      formType="update"
    />
   )
}

export default SpotUpdate;
