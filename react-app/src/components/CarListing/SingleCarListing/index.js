import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleCarListingThunk } from '../../../store/car_listings';

const SingleCarListing = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    let carListing = useSelector((state) => state.car_listings.singleCarListing);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          await dispatch(getSingleCarListingThunk(id));
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching car listing:', error);
        }
      };

      fetchData();
    }, [id, dispatch]);

    if (isLoading) {
      return <div>Loading...</div>;
    }
    console.log('==================================')
    console.log(carListing)



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
    car_photos,
    reviews,
  } = carListing;

  return (
    <div>
      <h1>
        {year} {make} {model} {trim} - ${price.toLocaleString()}
      </h1>
      {car_photos[0] && <img src={car_photos[0].photo_url} alt={`${make} ${model}`} />}
      <div>
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
      <div>
        <h2>Reviews</h2>
        {reviews.map((review) => (
          <div key={review.id}>
            <p>Rating: {review.rating}</p>
            <p>{review.review_text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleCarListing;
