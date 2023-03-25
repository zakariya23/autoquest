import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSingleCarPhotoThunk } from '../../../store/car_photos';
import './CarListingCard.css';
import { useHistory } from 'react-router-dom';

const CarListingCard = ({ carListing }) => {
  const {
    id,
    make,
    model,
    year,
    color,
    price,
    mileage
  } = carListing;



  const dispatch = useDispatch();
  const [photoUrl, setPhotoUrl] = useState('');
  const history = useHistory();
  
  useEffect(() => {
    const fetchCarPhoto = async () => {
      try {
        const carPhoto = await dispatch(getSingleCarPhotoThunk(id));
        console.log(carPhoto)
        if (carPhoto) {
          setPhotoUrl(carPhoto);
        }
      } catch (error) {
        console.error('Error fetching car photo:', error);
      }
    };

    fetchCarPhoto();
  }, [id, dispatch]);


  const handleClick = () => {
    history.push(`/car_listings/${carListing.id}`);
  };

  return (
    <div className="car-listing-card" onClick={handleClick}>
      <img
        className="car-listing-card__background"
        src={photoUrl}
      />
      <div className="car-listing-card__content | flow">
        <div className="car-listing-card__content--container | flow">
          <h2 className="car-listing-card__title">{`${year} ${make} ${model}`}</h2>
          <p className="car-listing-card__price">{`$${price}
           ${mileage} miles`}</p>

        </div>
      </div>
    </div>
  );
};

export default CarListingCard;
