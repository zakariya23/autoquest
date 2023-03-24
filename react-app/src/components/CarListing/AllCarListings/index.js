import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCarListingsThunk } from '../../../store/car_listings';
import CarListingCard from '../CarListingCard/index.js';
import './AllCarListings.css';

const AllCarListings = () => {
  const dispatch = useDispatch();
  let carListings = useSelector((state) => state.car_listings.carListings) || {};
  const [isLoading, setIsLoading] = useState(true);





  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllCarListingsThunk());
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching car listings:', error);
      }
    };

    fetchData();
  }, [dispatch]);






  if (isLoading) {
    return <div>Loading...</div>;
  }

console.log(carListings.car_listings)
carListings = Object.values(carListings.car_listings)


  return (

    <div className="car-listings-container">
      {carListings.map((carListing) => (
        <CarListingCard key={carListing.id} carListing={carListing} />
      ))}
    </div>
  );
};

export default AllCarListings;
