import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSingleCarListingThunk } from '../../../store/car_listings.js';
import './CarListingCard.css';
import { useHistory } from 'react-router-dom';
import EditCarListing from '../CarListingEditDelete/index.js';

const CarListingCard = ({ carListing }) => {

  const {
    id,
    make,
    model,
    year,
    exterior_color,
    interior_color,
    trim,
    body_type,
    price,
    mileage
  } = carListing;


  console.log(`=======================`)
  console.log(carListing)
  const dispatch = useDispatch();
  const [photoUrl, setPhotoUrl] = useState('');
  const history = useHistory();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchCarPhoto = async () => {
      try {
        const carPhoto = await dispatch(getSingleCarListingThunk(id));
        console.log('Car photo for ID', id, ':', carPhoto.car_photos[0].photo_url);
        if (carPhoto) {
          setPhotoUrl(carPhoto.car_photos[0].photo_url);
        }else{
          setPhotoUrl('https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png')
        }
      } catch (error) {
        console.error('Error fetching car photo:', error);
        setPhotoUrl('https://www.nbmchealth.com/wp-content/uploads/2018/04/default-placeholder.png')
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
          <p className='car-listing-card-mileage'>{`${mileage} miles`}</p>
          <p className='car-listing-card-mileage'>{`${exterior_color}`}</p>
          <p className='car-listing-card-mileage'>{`${interior_color} interior`}</p>
          <p className='car-listing-card-mileage'>{`${trim}`}</p>
          <p className='car-listing-card-mileage'>{`${body_type}`}</p>
          <p className="car-listing-card__price">{`$${price}`}</p>
        </div>
      </div>

    </div>

  );
};

export default CarListingCard;
