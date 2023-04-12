import { csrfFetch } from "./csrf";
import { getSpotByIdAction } from "./spots";

export const CREATE_REVIEW = "reviews/CREATE_REVIEW";
export const GET_REVIEWS = "reviews/GET_REVIEWS";
export const DELETE_REVIEW = "reviews/DELETE_REVIEWS";

export const createReviewAction = (newReview) => ({
  type: CREATE_REVIEW,
  newReview
});

export const getReviewsAction = (reviews) => ({
  type: GET_REVIEWS,
  reviews
});

export const deleteReviewAction = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId
})

export const thunkCreateReview = (newReviewInfo, spotId) => async(dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newReviewInfo)
  });

  if(res.ok) {
    const newReview = await res.json();
    dispatch(createReviewAction(newReview));
    return newReview;
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const thunkGetReviewBySpotId = (spotId) => async(dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if(res.ok) {
    const reviews = await res.json();
    await dispatch(getReviewsAction(reviews));
    return reviews;
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const thunkDeleteReview = (reviewId) => async(dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE"
  });

  if(res.ok) {
    dispatch(deleteReviewAction(reviewId));
  }
}

const reviewsReducer = (state = {}, action) => {
  switch(action.type) {
    case GET_REVIEWS: {
      const reviews = {};
      action.reviews.Reviews.forEach(review => reviews[review.id] = review);
      return reviews;
    }

    case DELETE_REVIEW: {
      const modState = {...state};
      delete modState[action.reviewId];
      return modState;
    }

    default:
      return state;
  }
}

export default reviewsReducer;
