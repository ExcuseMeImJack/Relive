import { csrfFetch } from "./csrf";

export const CREATE_SPOT = "spots/CREATE_SPOT";
export const GET_ALL_SPOTS = "spots/GET_ALL_SPOTS";
export const GET_ONE_SPOT = "spots/GET_ONE_SPOT";
export const UPDATE_SPOT = "spots/UPDATE_SPOT";
export const DELETE_SPOT = "spots/DELETE_SPOT";
export const CREATE_SPOT_IMAGE = "spots/CREATE_SPOT_IMAGE";

// Action Creators
export const createSpotAction = (newSpot) => ({
  type: CREATE_SPOT,
  newSpot
});

export const getAllSpotsAction = (spots) => ({
  type: GET_ALL_SPOTS,
  spots
});

export const getSpotByIdAction = (spot) => ({
  type: GET_ONE_SPOT,
  spot
});

export const updateSpotAction = (spot) => ({
  type: UPDATE_SPOT,
  spot
});

export const deleteSpotAction = (spotId) => ({
  type: DELETE_SPOT,
  spotId
});


export const createSpotImageAction = (spotImage) => ({
  type: CREATE_SPOT_IMAGE,
  spotImage
})


// Thunk Action Creators
export const thunkCreateSpot = (newSpotInfo) => async(dispatch) => {
  const res = await csrfFetch('/api/spots', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newSpotInfo)
  });

  if(res.ok) {
    const newSpot = await res.json();
    dispatch(getSpotByIdAction(newSpot))
    return newSpot;
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const thunkGetAllSpots = () => async(dispatch) => {
  const res = await csrfFetch('/api/spots');

  if(res.ok) {
    const spots = await res.json();
    dispatch(getAllSpotsAction(spots));
    return spots;
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const thunkGetSpotById = (spotId) => async(dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if(res.ok) {
    const spot = await res.json();
    await dispatch(getSpotByIdAction(spot));
    return spot;
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const thunkUpdateSpot = (spotId, updatedSpot) => async(dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedSpot)
  });

  if(res.ok) {
    const confirmedUpdatedSpot = await res.json();
    dispatch(updateSpotAction(confirmedUpdatedSpot));
    return confirmedUpdatedSpot;
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const thunkDeleteSpot = (spotId) => async(dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE"
  });
  if(res.ok) {
    dispatch(deleteSpotAction(spotId));
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const thunkCreateSpotImage = (spotID, spotImage) => async(dispatch) => {
  const { file, preview } = spotImage;

  const formData = new FormData();
  formData.append("preview", preview);
  formData.append("url", file);

  const res = await csrfFetch(`/api/spots/${spotID}/images`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: formData
  });

  if(res.ok) {
    console.log("HIT")
    const newSpotImage = await res.json();
    dispatch(createSpotImageAction(spotImage))
    return newSpotImage;
  } else {
    const errors = await res.json();
    return errors;
  }
}

// Reducer
const spotsReducer = (state = {}, action) => {
  switch(action.type) {

    // GET ALL SPOTS
    case GET_ALL_SPOTS: {
      const spots = {};
      // console.log(action.spots)
      action.spots.Spots.forEach(spot => spots[spot.id] = spot);
      return spots;
    };

    // GET ONE SPOT
    case GET_ONE_SPOT: {
      const modState = {...state};
      modState[action.spot.id] = action.spot;
      return modState;
    };

    // UPDATE SPOT
    case UPDATE_SPOT: {
      const modState = {...state};
      modState[action.spot.id] = action.spot;
      return modState;
    };

    // DELETE SPOT
    case DELETE_SPOT: {
      const modState = {...state};
      delete modState[action.spotId];
      return modState;
    }

    default:
      return state;
  }
}

export default spotsReducer;
