import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleCarListingThunk } from "../../../store/car_listings";
import { getCarPhotosThunk } from "../../../store/car_photos";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { postReviewThunk, deleteReviewThunk, editReviewThunk } from "../../../store/reviews";
import "./SingleCarListing.css";
import ReviewForm from "../../Reviews/CreateReview";
import Review from "./Review";

const SingleCarListing = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const carPhotos = useSelector((state) => state.car_photos.carPhotos);
  const carListing = useSelector((state) => state.car_listings.singleCarListing);
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector((state) => state.session.user.id);
  const user = useSelector((state) => state.session.user);
  const [reviewActionCounter, setReviewActionCounter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getSingleCarListingThunk(id));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching car listing:", error);
      }
    };

    fetchData();
  }, [id, dispatch, reviewActionCounter]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const {
    year,
    make,
    model,
    trim,
    price,
    mileage,
    body_type,
    exterior_color,
    interior_color,
  } = carListing;

  const handleAddReview = async (reviewData) => {
    await dispatch(postReviewThunk(id, reviewData, userId));
    setReviewActionCounter(reviewActionCounter + 1);
  };

  const handleUpdateReview = async (reviewId, reviewData) => {
    await dispatch(editReviewThunk(id, reviewId, reviewData));
    setReviewActionCounter(reviewActionCounter + 1);
  };

  const handleDeleteReview = async (reviewId) => {
    await dispatch(deleteReviewThunk(reviewId));
    setReviewActionCounter(reviewActionCounter + 1);
  };

  return (
    <div className="single-car-listing">
      <h1 className="single-car-listing-title">
        {year} {make} {model} {trim} - ${price.toLocaleString()}
      </h1>
      <Carousel className="single-car-listing-carousel">
        {carListing.car_photos.map((carPhoto) => (
          <div key={carPhoto.id}>
            <img src={carPhoto.photo_url} alt={`${make} ${model}`} />
          </div>
        ))}
      </Carousel>
      <div className="single-car-listing-content">
        <div className="single-car-listing-overview">
          <h2>Overview</h2>
          <p>Year: {year}</p>
          <p>Make: {make}</p>
          <p>Model: {model}</p>
          <p>Trim: {trim}</p>
          <p>Mileage: {mileage.toLocaleString()} miles</p>
          <p>Body Type: {body_type}</p>
          <p>Exterior Color: {exterior_color}</p>
          <p>Interior Color: {interior_color}</p>
        </div>
        <div className="single-car-listing-reviews">
          <h2>Reviews</h2>
          <ReviewForm onSubmit={handleAddReview} />
          {carListing.reviews.map((review) => (
            <Review
              key={review.id}
              review={review}
              onUpdate={handleUpdateReview}
              onDelete={handleDeleteReview}
            />
          ))}
        </div>
        <div className="single-car-listing-owner">
          <h2>Owner</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          {/* You will need to fetch the number of listings for the user separately */}
          <p>Number of Listings: {/* Display the number of listings here */}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleCarListing;
