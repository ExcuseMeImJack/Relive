import { csrfFetch } from "./csrf";

export const CREATE_BOOKING = "bookings/CREATE_BOOKING";
export const GET_USER_BOOKINGS = "bookings/GET_USER_BOOKINGS";
export const GET_SPOT_BOOKINGS = "bookings/GET_SPOT_BOOKINGS";
export const GET_BOOKING = "bookings/GET_BOOKING";
export const UPDATE_BOOKING = "bookings/UPDATE_BOOKING";
export const DELETE_BOOKING = "bookings/DELETE_BOOKING";
export const NUKE_BOOKING = "bookings/NUKE_BOOKING";

// Action Creators
export const actionCreateBooking = (newBooking) => ({
  type: CREATE_BOOKING,
  newBooking
});

export const actionGetUserBookings = (bookings) => ({
  type: GET_USER_BOOKINGS,
  bookings
})

export const actionGetSpotBookings = (bookings) => ({
  type: GET_SPOT_BOOKINGS,
  bookings
})

export const actionGetBooking = (booking) => ({
  type: GET_BOOKING,
  booking
})

export const actionUpdateBooking = (booking) => ({
  type: UPDATE_BOOKING,
  booking
})

export const actionDeleteBooking = (booking) => ({
  type: DELETE_BOOKING,
  booking
})

export const actionNukeUserBookings = () => ({
  type: NUKE_BOOKING
})

// Thunk Action Creators
export const thunkCreateBooking = (newBookingInfo, spotId) => async(dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newBookingInfo)
  });

  if(res.ok) {
    const newBooking = await res.json();
    dispatch(actionCreateBooking(newBooking))
    return newBooking
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const thunkGetUserBookings = () => async(dispatch) => {
  const res = await csrfFetch('/api/bookings/current');

  if(res.ok) {
    const bookings = await res.json();
    dispatch(actionGetUserBookings(bookings));
    return bookings
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const thunkGetSpotBookings = (spotId) => async(dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/bookings`);

  if(res.ok) {
    const bookings = await res.json();
    dispatch(actionGetSpotBookings(bookings));
    return bookings
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const thunkGetBookingById = (bookingId) => async(dispatch) => {
  const res = await csrfFetch(`/api/bookings/${bookingId}`);

  if(res.ok) {
    const booking = await res.json();
    dispatch(actionGetBooking(booking));
    return booking
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const thunkUpdateBookingById = (updatedBookingInfo, bookingId) => async(dispatch) => {
  const res = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedBookingInfo)
  });

  if(res.ok) {
    const updatedBooking = await res.json();
    dispatch(actionUpdateBooking(updatedBooking));
    return updatedBooking;
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const thunkDeleteBookingById = (bookingId) => async(dispatch) => {
  const res = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE"
  })
  if(res.ok) {
    dispatch(actionDeleteBooking(bookingId));
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const nukeUserBookings = () => async(dispatch) => {
  dispatch(actionNukeUserBookings())
}

// Reducer

const bookingsReducer = (state = {bookings: {}, spotBookings: {}}, action) => {
  switch(action.type) {
    case GET_USER_BOOKINGS: {
      const bookings = {...state};
      action.bookings.Bookings.forEach(booking => bookings.bookings[booking.id] = booking);
      return bookings
    }
    case GET_SPOT_BOOKINGS: {
      const spotBookings = {...state};
      action.bookings.Bookings.forEach(booking => spotBookings.spotBookings[booking.id] = booking);
      return spotBookings
    }
    case GET_BOOKING: {
      const modState = {...state};
      modState[action.booking.id] = action.booking;
      return modState;
    }
    case UPDATE_BOOKING: {
      const modState = {...state};
      modState[action.booking.id] = action.booking;
      return modState;
    }
    case DELETE_BOOKING: {
      const modState = {...state};
      delete modState.bookings[action.booking];
      delete modState.spotBookings[action.booking];
      return modState
    }
    case NUKE_BOOKING: {
      const nukedState = {bookings: {}, spotBookings: {}};
      return nukedState
    }
    default:
      return state;
  }
}

export default bookingsReducer;
