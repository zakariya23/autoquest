import React, { useState, useEffect } from 'react';
import './CarAutocomplete2.css'

const Autocomplete2 = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedCarData, setSelectedCarData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      searchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  }, [query]);



  const handleCarSelect = (suggestion) => {
    setQuery(`${suggestion.Make} ${suggestion.Model}`);
    setSelectedCar(suggestion);
    setSuggestions([]);
  };

  const handleFetchListings = () => {
    if (selectedCar) {
      fetchListings(selectedCar.Make, selectedCar.Model);
    }
  };

  const searchSuggestions = async (searchTerm) => {
    const searchTerms = searchTerm.split(' ');

    const where = searchTerms.map((term) => {



      return {
        "$or": [
          { "Make": { "$regex": `^${term}`, "$options": "i" } },
          { "Model": { "$regex": `^${term}`, "$options": "i" } },
          { "Category": { "$regex": `^${term}`, "$options": "i" } },
        ],
      };

    });

    const response = await fetch(`https://parseapi.back4app.com/classes/Car_Model_List?limit=10&where=${encodeURIComponent(JSON.stringify({ "$and": where }))}`, {
      headers: {
        'X-Parse-Application-Id': 'hlhoNKjOvEhqzcVAJ1lxjicJLZNVv36GdbboZj3Z',
        'X-Parse-Master-Key': 'SNMJJF0CZZhTPhLDIqGhTlUNV9r60M2Z5spyWfXW',
      },
    });
    const data = await response.json();
    setSuggestions(data.results);
  };


  const fetchListings = async (make, model) => {
    const response = await fetch(`/api/car_listings/search-autotrader?make=${make}&model=${model}`);
    const data = await response.json();
    setSelectedCarData(data);
  };


  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };


  const renderCards = () => {
    if (!selectedCarData) {
      return null;
    }
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return selectedCarData.map((carData) => (
      <div key={carData.vin} className="card">
        <img src={carData.image_url} alt=""></img>
        <div className="card-body">
          <p className="card-title">{carData.title}</p>
          <ul className="card-info">
            <li><strong>Mileage:</strong> {carData.mileage}</li>
            <li><strong>Price:</strong> {carData.price}</li>
            <li><strong>VIN:</strong> {carData.vin}</li>
          </ul>
        </div>
      </div>
    ));
  };

  return (
    <div className='BigSearch'>


      <div className="autocomplete">
        <input type="text" value={query} onChange={handleInputChange} />

        <button onClick={handleFetchListings} disabled={!selectedCar}>Search</button>
        <ul className="suggestions-list">
          {suggestions &&
            suggestions.map((suggestion) => (
              <li
                key={suggestion.objectId}
                onClick={() => handleCarSelect(suggestion)}
              >
                {suggestion.Make} {suggestion.Model}
              </li>
            ))}
        </ul>
      </div>
      <div className='results'>
      {renderCards()}
      </div>

    </div>
  );
};

export default Autocomplete2;
