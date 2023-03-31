import React, { useState, useEffect } from 'react';
import './CarAutocomplete2.css'
import { Link } from 'react-router-dom';

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
    console.log(data.results)

    const uniqueModels = data.results.reduce((acc, curr) => {
      const isExistingModel = acc.find(car => car.Model === curr.Model);

      if (!isExistingModel) {
        acc.push(curr);
      }

      return acc;
    }, []);

    console.log(uniqueModels)
    setSuggestions(uniqueModels);
  };


  const fetchListings = async (make, model) => {
    setIsLoading(true);
    const response = await fetch(`/api/car_listings/search-autotrader?make=${make}&model=${model}`);
    const data = await response.json();
    setSelectedCarData(data);
    setIsLoading(false);
  };


  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const renderCards = () => {
    if (!selectedCarData) {
      return null;
    }

    if (isLoading) {
      return <div>Loading...</div>;
    }

    const uniqueCarData = selectedCarData.reduce((acc, curr) => {
      const existingCar = acc.find(car => car.vin === curr.vin);

      if (!existingCar) {
        acc.push(curr);
      }

      return acc;
    }, []);


    return uniqueCarData.map((carData) => (


      <div key={carData.vin} className="card">
        <img src={carData.image_url} alt=""></img>
        <div className="card-body">
          <p className="card-title">{carData.title}</p>
          <ul className="card-info">
            <li><strong>Mileage:</strong> {carData.mileage}</li>
            <li><strong>Price:</strong> {formatter.format(carData.price)}</li>
            <li><strong>Exterior Color:</strong> {carData.exterior_color}</li>
            <li><strong>Interior Color:</strong> {carData.interior_color ? carData.interior_color : 'N/A'}</li>
            <li><strong>VIN:</strong> {carData.vin}</li>
            <li><a href={carData.url}  target="_blank">Listing</a></li>
          </ul>
        </div>
      </div>

    ));
  };

  return (
    <div className='BigSearch'>
      <h1>
        Search AutoTrader for lowest price
      </h1>

      <div className="autocomplete">
        <input type="text" value={query} onChange={handleInputChange} />

        <button onClick={handleFetchListings} disabled={!selectedCar} className='button-green'>Search</button>
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
      {isLoading ? <div>Loading...</div> : renderCards()}
      </div>

    </div>
  );
};

export default Autocomplete2;
