import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Autocomplete from '../CarAutocomplete';
import { searchCarListingsThunk } from '../../store/car_listings';

const CarSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();

  const handleCarSelect = async (car) => {
    const searchString = `${car.Make} ${car.Model} ${car.Year}`;
    const results = await dispatch(searchCarListingsThunk(searchString));
    setSearchResults(results.car_listings);
  };

  return (
    <div className="car-search">
      <h2>Search Car Listings</h2>
      <Autocomplete onCarSelect={handleCarSelect} />
      <div className="search-results">
        {Object.values(searchResults).map((car) => (
          <div key={car.id}>
            <h3>
              {car.year} {car.make} {car.model} {car.trim}
            </h3>
            <p>Price: ${car.price.toLocaleString()}</p>
        
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarSearch;
