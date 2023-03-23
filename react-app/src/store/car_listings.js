import { getCarListingReviewsThunk } from "./reviews";

/* ----- CONSTANTS ----- */
const GET_SINGLE_CAR_LISTING = "car_listings/GET_SINGLE_CAR_LISTING";
const GET_ALL_CAR_LISTINGS = "car_listings/GET_ALL_CAR_LISTINGS";
const SEARCH_CAR_LISTINGS = "car_listings/SEARCH_CAR_LISTINGS";
const FILTERED_CAR_LISTINGS = "car_listings/FILTERED_CAR_LISTINGS";

/* ----- ACTIONS ----- */
const getSingleCarListingAction = (carListing) => {
  return {
    type: GET_SINGLE_CAR_LISTING,
    carListing,
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

export const filteredCarListingsAction = (carListings) => {
  return {
    type: FILTERED_CAR_LISTINGS,
    carListings,
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

/* ----- INITIAL STATE ----- */
const initialState = {
  carListings: null,
  singleCarListing: null,
  filteredCarListings: null,
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
    default:
      return state;
  }
};

export default carListingReducer;
