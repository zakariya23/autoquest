import { getCarListingReviewsThunk } from "./reviews";

/* ----- CONSTANTS ----- */
const GET_SINGLE_CAR_LISTING = "car_listings/GET_SINGLE_CAR_LISTING";
const GET_ALL_CAR_LISTINGS = "car_listings/GET_ALL_CAR_LISTINGS";
const SEARCH_CAR_LISTINGS = "car_listings/SEARCH_CAR_LISTINGS";
const FILTERED_CAR_LISTINGS = "car_listings/FILTERED_CAR_LISTINGS";
const POST_CAR_LISTING = "car_listings/POST_CAR_LISTING";
const UPDATE_CAR_LISTING = "car_listings/UPDATE_CAR_LISTING";
const GET_MY_CAR_LISTINGS = "car_listings/GET_MY_CAR_LISTINGS";
const DELETE_CAR_LISTING = "car_listings/DELETE_CAR_LISTING";

/* ----- ACTIONS ----- */
const getSingleCarListingAction = (carListing) => {
  return {
    type: GET_SINGLE_CAR_LISTING,
    carListing,
  };
};


const getMyCarListingsAction = (myCarListings) => {
  return {
    type: GET_MY_CAR_LISTINGS,
    myCarListings,
  };
};

const getAllCarListingsAction = (carListings) => {
  return {
    type: GET_ALL_CAR_LISTINGS,
    carListings,
  };
};

const searchCarListingsAction = (carListings) => {
  return {
    type: SEARCH_CAR_LISTINGS,
    carListings,
  };
};

const filteredCarListingsAction = (carListings) => {
  return {
    type: FILTERED_CAR_LISTINGS,
    carListings,
  };
};

const postCarListingAction = (carListing) => {
  return {
    type: POST_CAR_LISTING,
    carListing,
  };
};

const updateCarListingAction = (carListing) => {
  return {
    type: UPDATE_CAR_LISTING,
    carListing,
  };
};

const deleteCarListingAction = (carListingId) => {
  return {
    type: DELETE_CAR_LISTING,
    carListingId,
  };
};

/* ----- THUNKS ----- */

// Display single car listing details
export const getSingleCarListingThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/car_listings/${id}`);
  if (res.ok) {
    const carListing = await res.json();
    dispatch(getSingleCarListingAction(carListing));
    return carListing;
  }
};

// Get all car listings
export const getAllCarListingsThunk = () => async (dispatch) => {
  const res = await fetch(`/api/car_listings`);
  if (res.ok) {
    const carListings = await res.json();
    dispatch(getAllCarListingsAction(carListings));
  }
};

// Search car listings through search bar
export const searchCarListingsThunk = (searchString) => async (dispatch) => {
  const res = await fetch(`/api/car_listings/search?query=${searchString}`);
  if (res.ok) {
    const searchResults = await res.json();
    dispatch(searchCarListingsAction(searchResults));
    return searchResults;
  }
};

// create car listing
export const createCarListing = (payload) => async (dispatch) => {

    const res = await fetch("/api/car_listings/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return res;

  }

// update car listing
export const updateCarListing = (payload) => async (dispatch) => {
  const res = await fetch(`/api/car_listings/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const carListing = await res.json();
    dispatch(updateCarListingAction(carListing));
    return carListing;
  } else {
    const errorData = await res.json();
    throw errorData;
  }
};

// get current user car listings
export const getMyCarListingsThunk = () => async (dispatch) => {
  const res = await fetch(`/api/car_listings/my_listings`);
if (res.ok) {
  const myCarListings = await res.json();
  dispatch(getMyCarListingsAction(myCarListings));
}
};


//delete car listing from id
export const deleteCarListingThunk = (carListingId) => async (dispatch) => {
  const res = await fetch(`/api/car_listings/${carListingId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const response = await res.json();
    if (response.status_code === 200) {
      dispatch(deleteCarListingAction(carListingId));
      return response;
    } else {
      return response;
    }
  } else {
    const errorData = await res.json();
    throw errorData;
  }
};


/* ----- INITIAL STATE ----- */
const initialState = {
  carListings: null,
  singleCarListing: null,
  filteredCarListings: null,
  myCarListings: null
};

/* ----- REDUCER ----- */
const carListingReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_SINGLE_CAR_LISTING:
      newState.singleCarListing = action.carListing;
      return newState;
    case GET_ALL_CAR_LISTINGS:
      newState.carListings = action.carListings;
      return newState;
    case SEARCH_CAR_LISTINGS:
      newState.carListings = action.carListings.carListings;
      newState.filteredCarListings = Object.values(action.carListings.carListings);
      return newState;
    case FILTERED_CAR_LISTINGS:
      newState.filteredCarListings = action.carListings;
      return newState;
    case POST_CAR_LISTING:
      newState.carListings = { ...newState.carListings, [action.carListing.id]: action.carListing };
      return newState;
    case UPDATE_CAR_LISTING:
      newState.carListings = { ...newState.carListings, [action.carListing.id]: action.carListing };
      newState.singleCarListing = action.carListing;
      return newState;
    case GET_MY_CAR_LISTINGS:
      newState.myCarListings = Object.values(action.myCarListings);
      return newState;
      case DELETE_CAR_LISTING:
        if (newState.carListings && newState.carListings[action.carListingId]) {
          delete newState.carListings[action.carListingId];
        }
        if (newState.myCarListings) {
          newState.myCarListings = newState.myCarListings.filter(
            (carListing) => carListing.id !== action.carListingId
          );
        }
        return newState;
    default:
      return state;
  }
};

export default carListingReducer;
