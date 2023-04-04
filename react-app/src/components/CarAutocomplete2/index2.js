import React, { useState, useEffect } from 'react';

const Autocomplete3 = ({ make, model }) => {
  const [selectedCarData, setSelectedCarData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/car_listings/search-autotrader?make=${make}&model=${model}`);
    const data = await response.json();
    setSelectedCarData(data);
    setIsLoading(false);
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

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
    <div className='results'>
      {isLoading ? <div>Loading...</div> : renderCards()}
    </div>
  );
};

export default Autocomplete3;
