import { getSingleCarListingThunk } from "./car_listings";

/* ----- CONSTANTS ----- */
const GET_CAR_PHOTOS = "car_photos/GET_CAR_PHOTOS";
const GET_SINGLE_CAR_PHOTO = "car_photos/GET_SINGLE_CAR_PHOTO"
const POST_CAR_PHOTO = "car_photos/POST_CAR_PHOTO";
const DELETE_CAR_PHOTO = "car_photos/DELETE_CAR_PHOTO";

/* ----- ACTIONS ----- */
export const getCarPhotosAction = (carPhotos) => {
    return {
        type: GET_CAR_PHOTOS,
        carPhotos
    };
};

const getSingleCarPhotoAction = (carPhoto) => {
    return {
        type: GET_SINGLE_CAR_PHOTO,
        carPhoto
    };
};

const postCarPhotoAction = (carPhoto) => {
    return {
        type: POST_CAR_PHOTO,
        carPhoto,
    };
};

const deleteCarPhotoAction = (id) => {
    return {
        type: DELETE_CAR_PHOTO,
        id,
    };
};

/* ----- THUNKS ----- */

// Post new car photo by car_listing_id
export const postCarPhotoThunk =
    (newCarPhoto, carListingId) => async (dispatch) => {
        const res = await fetch(`/api/car_listings/${carListingId}/car_photos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCarPhoto),
        });

        if (res.ok) {
            const createdCarPhoto = await res.json();
            dispatch(postCarPhotoAction(createdCarPhoto));
            dispatch(getSingleCarListingThunk(carListingId));
            return createdCarPhoto;
        } else if (res.status < 500) {
            const data = await res.json();
            return data
        } else {
            return {"errors": "A server error occurred. Please try again."};
        }
    };

// Delete car photo by car photo id
export const deleteCarPhotoThunk = (carPhotoId) => async (dispatch) => {
    const res = await fetch(`/api/car_photos/${carPhotoId}`, {
        method: "DELETE"
    });
    if (res.ok) {
        dispatch(deleteCarPhotoAction(carPhotoId));
    } else if (res.status < 500) {
        const data = await res.json();
        return data
    } else {
        return {"errors": "A server error occurred. Please try again."};
    }
};

// Display all car photos for a car listing
export const getCarPhotosThunk = (carListingId) => async (dispatch) => {
    const res = await fetch(`/api/car_listings/${carListingId}/car_photos`);
    if (res.ok) {
        const carPhotos = await res.json();
        dispatch(getCarPhotosAction(carPhotos));
    }
};

export const getSingleCarPhotoThunk = (carListingId) => async (dispatch) => {
    try {
      const response = await fetch(`/api/car_photos/${carListingId}`);
      const data = await response.json();
      console.log(data)
      dispatch(getSingleCarPhotoAction(response.url));
      return data.photo_url;
    } catch (error) {
      console.error('Error fetching single car photo:', error);
    }
  };

/* ----- INITIAL STATE ----- */
const initialState = {
    carPhotos: null,
    singleCarPhoto: null,
};

/* ----- REDUCER ----- */
const carPhotosReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_CAR_PHOTOS:
            newState.carPhotos = action.carPhotos.carPhotos;
            return newState;
        case GET_SINGLE_CAR_PHOTO:
            newState.singleCarPhoto = action.carPhoto;
            return newState;
            case DELETE_CAR_PHOTO:
                if (newState.carPhotos) {
                    delete newState.carPhotos[action.id];
                }
                return newState;
            case POST_CAR_PHOTO:
                newState.singleCarPhoto = action.carPhoto;
                return newState;
            default:
                return state;
        }
    };

    export default carPhotosReducer;
