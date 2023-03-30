import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCarListing, deleteCarListingThunk } from '../../../store/car_listings';
import { postCarPhotoThunk, deleteCarPhotoThunk, getCarPhotosThunk } from '../../../store/car_photos';
import { useHistory } from 'react-router-dom';
import './EditDelete.css'
import EditPhotos from './EditPhotos';

const EditCarListing = ({ carListing, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(carListing);
  const history = useHistory();
  const carPhotos = useSelector((state) => state.carPhotos);


  useEffect(() => {
    setFormData(carListing);
  }, [carListing]);

  useEffect(() => {
    dispatch(getCarPhotosThunk(carListing.id));
  }, [dispatch, carListing.id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCarListing = {
      ...formData,
      year: parseInt(formData.year, 10),
      price: parseInt(formData.price, 10),
      mileage: parseInt(formData.mileage, 10),
    };
    await dispatch(updateCarListing(updatedCarListing));
    onClose();
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this listing?");

  if (confirmDelete) {
    await dispatch(deleteCarListingThunk(carListing.id));
    onClose();
  }
  };

  return (
    <div className="edit-car-listing">
      <form onSubmit={handleSubmit}>
      <input name="make" value={formData.make} onChange={handleChange} />
        <input name="model" value={formData.model} onChange={handleChange} />
        <input name="year" value={formData.year} onChange={handleChange} />
        <input name="price" value={formData.price} onChange={handleChange} />
        <input name="trim" value={formData.trim} onChange={handleChange} />
        <input name="body_type" value={formData.body_type} onChange={handleChange} />
        <input name="interior_color" value={formData.interior_color} onChange={handleChange} />
        <input name="exterior_color" value={formData.exterior_color} onChange={handleChange} />
        <input name="mileage" value={formData.mileage} onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
      <button onClick={handleDelete}>Delete Listing</button>

      <EditPhotos carListing={carListing} onClose={onClose} />
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EditCarListing;
