import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postCarPhotoThunk, deleteCarPhotoThunk, getCarPhotosThunk } from '../../../store/car_photos';
import './EditPhotos.css'

const EditPhotos = ({ carListing, onClose }) => {
  const dispatch = useDispatch();
  let carPhotos = useSelector((state) => state.car_photos.carPhotos);

  useEffect(() => {
    dispatch(getCarPhotosThunk(carListing.id));
  }, [dispatch, carListing.id]);

  console.log('CAR PHOTOS ---', carPhotos)

if(carPhotos){
  carPhotos = Object.values(carPhotos.car_photos)
}


  const handleAddPhoto = async (e) => {
    e.preventDefault();
    const newPhotoUrl = prompt("Enter the new photo URL:");
    if (newPhotoUrl) {
      await dispatch(postCarPhotoThunk({ photo_url: newPhotoUrl }, carListing.id));
      dispatch(getCarPhotosThunk(carListing.id));
    }
  };

  const handleDeletePhoto = async (carPhotoId) => {
    await dispatch(deleteCarPhotoThunk(carPhotoId));
    dispatch(getCarPhotosThunk(carListing.id));
  };

  return (
    <div className="edit-photos">
      {carPhotos && carPhotos.map((carPhoto) => (
        <div key={carPhoto.id} className="photo-container">
          <img src={carPhoto.photo_url} alt={`Car ${carListing.id}`} />
          <button className="delete-photo-btn" onClick={() => handleDeletePhoto(carPhoto.id)}>X</button>
        </div>
      ))}
      <div>
      <button onClick={handleAddPhoto}>Add Photo</button>
      </div>
    </div>
  );
};

export default EditPhotos;
