import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMyCarListingsThunk } from '../../../store/car_listings';
import CarListingCard from '../CarListingCard/index.js';
import EditCarListing from '../CarListingEditDelete';
import './MyCarListings.css';

const MyCarListings = () => {
  const dispatch = useDispatch();
  let myCarListings = useSelector((state) => state.car_listings.myCarListings) || [];
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCarListing, setSelectedCarListing] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getMyCarListingsThunk());
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching my car listings:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleEdit = (carListing) => {
    setSelectedCarListing(carListing);
    setIsEditing(true);
  };

  const handleClose = () => {
    setSelectedCarListing(null);
    setIsEditing(false);
    dispatch(getMyCarListingsThunk());
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  myCarListings = Object.values(myCarListings[0]);

  return (
    <div className="my-car-listings-container">
      {myCarListings.map((carListing) => (
        <div key={carListing.id} className="car-listing-container">
          <CarListingCard carListing={carListing} />
          <button onClick={() => handleEdit(carListing)}>Edit</button>
          {isEditing && selectedCarListing && selectedCarListing.id === carListing.id && (
            <div className="edit-menu">
              <EditCarListing carListing={selectedCarListing} onClose={handleClose} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyCarListings;
