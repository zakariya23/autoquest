import { getSingleCarListingThunk } from "./car_listings";


/* ----- CONSTANTS ----- */
const GET_CAR_LISTING_REVIEWS = "reviews/GET_CAR_LISTING_REVIEWS";
const GET_USER_REVIEWS = "reviews/GET_USER_REVIEWS";
const POST_REVIEW = "reviews/POST_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";
const GET_SINGLE_REVIEW = "reviews/GET_SINGLE_REVIEW";
const EDIT_REVIEW = "reviews/EDIT_REVIEW";


/* ----- ACTIONS ----- */
const getCarListingReviewsAction = (reviews) => {
    return {
        type: GET_CAR_LISTING_REVIEWS,
        reviews,
    };
};

const getUserReviewsAction = (reviews) => {
    return {
        type: GET_USER_REVIEWS,
        reviews,
    };
};

const postReviewAction = (review) => {
    return {
        type: POST_REVIEW,
        review,
    };
};

const deleteReviewAction = (id) => {
    return {
        type: DELETE_REVIEW,
        id,
    };
};

const getSingleReviewAction = (review) => {
    return {
        type: GET_SINGLE_REVIEW,
        review,
    };
};

const editReviewAction = (review) => {
    return {
        type: EDIT_REVIEW,
        review,
    };
};


/* ----- THUNKS ----- */

// Display all car listing reviews at car listing detail page
export const getCarListingReviewsThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/car_listings/${id}/reviews`);
    if (res.ok) {
        const reviews = await res.json();
        dispatch(getCarListingReviewsAction(reviews));
    }
};

// Display all user reviews at manage reviews page
export const getUserReviewsThunk = () => async (dispatch) => {
    const res = await fetch(`/api/reviews/current`);
    if (res.ok) {
        const reviews = await res.json();
        dispatch(getUserReviewsAction(reviews));
    }
};

// Delete review by review id for current user
export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
    });
    if (res.ok) {
        dispatch(deleteReviewAction(reviewId));
    }
};

// Post new review by car listing id for current user
// Post new review by car listing id for current user
export const postReviewThunk = (carListingId, newReview, userId) => async (dispatch) => {
    console.log(carListingId)
    console.log('USER ID:', userId)
    console.log('new review:', newReview)

    // Include user_id and car_listing_id in the newReview object
    const updatedNewReview = {
        ...newReview,
        user_id: userId,
        car_listing_id: carListingId
    };

    console.log(updatedNewReview)

    const res = await fetch(`/api/reviews/car_listing/${carListingId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedNewReview),
    });

    if (res.ok) {
        const createdReview = await res.json();
        dispatch(postReviewAction(createdReview));
        // Update the car listing with new review information
        dispatch(getSingleCarListingThunk(newReview)); // Pass carListingId here
        return createdReview;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return { "errors": ["A server error occurred. Please try again."] };
    }
};
// Get single review by review id
export const getSingleReviewThunk = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`);
    if (res.ok) {
        const singleReview = await res.json();
        dispatch(getSingleReviewAction(singleReview));
        return singleReview;
    }
};

// Edit review by review id via current user
export const editReviewThunk =
    (reviewId, reviewContent) => async (dispatch) => {
        const res = await fetch(`/api/reviews/${reviewId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reviewContent),
        });
        if (res.ok) {
            const editedReview = await res.json();
            dispatch(editReviewAction(editedReview));
            // Update the car listing with edited review information
            dispatch(getSingleCarListingThunk(editedReview.car_listing_id))
            return editedReview;
        } else if (res.status < 500) {
            const data = await res.json();
            if (data.errors) {
                return data.errors;
            }
        } else {
            return { "errors": ["A server error occurred. Please try again."] };
        }
    };


/* ----- INITIAL STATE ----- */
const initialState = {
    carListingReviews: null,
    userReviews: null,
    singleReview: null,
};

/* ----- REDUCER ----- */
const reviewsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_CAR_LISTING_REVIEWS:
            newState.carListingReviews = action.reviews.carListingReviews;
            return newState;
        case GET_USER_REVIEWS:
            newState.userReviews = action.reviews.userReviews;
            return newState;
        case POST_REVIEW:
            newState.singleReview = action.review;
            return newState;
        case DELETE_REVIEW:
            if (newState.userReviews) {
                delete newState.userReviews[action.id];
            }
            if (newState.carListingReviews) {
                delete newState.carListingReviews[action.id];
            }
            return newState;
        case GET_SINGLE_REVIEW:
            newState.singleReview = action.review;
            return newState;
        case EDIT_REVIEW:
            newState.singleReview = action.review;
            return newState;
        default:
            return state;
    }
};

export default reviewsReducer;
