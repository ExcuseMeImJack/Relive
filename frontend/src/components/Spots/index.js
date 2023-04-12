// import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { thunkGetAllSpots } from '../../store/spots';
import SpotItem from './SpotItem';
import './spots.css'

const Spots = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => Object.values(state.spots));
  // console.log('SPOTS', spots);

  useEffect(() => {
    dispatch(thunkGetAllSpots())
  }, [dispatch]);

  if(Object.keys(spots).length > 0){
    return (
      <div className='landing-container'>
        {spots.map(spot => <SpotItem spot={spot} key={spot.id}/>)}
      </div>
    );
  }
}

export default Spots;
