import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createCarListing } from "../../../store/car_listings";
import Autocomplete from "../../CarAutocomplete";
// import "./CarListingCreate.css";

export default function CarListingForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  // Declare state for form fields
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [trim, setTrim] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [exteriorColor, setExteriorColor] = useState("");
  const [interiorColor, setInteriorColor] = useState("");
  const [mileage, setMileage] = useState("");
  const [errors, setErrors] = useState([]);

  // Update functions for form fields
  const updateMake = (e) => setMake(e.target.value);
  const updateModel = (e) => setModel(e.target.value);
  const updateYear = (e) => setYear(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updateTrim = (e) => setTrim(e.target.value);
  const updateBodyType = (e) => setBodyType(e.target.value);
  const updateExteriorColor = (e) => setExteriorColor(e.target.value);
  const updateInteriorColor = (e) => setInteriorColor(e.target.value);
  const updateMileage = (e) => setMileage(e.target.value);

  const clearData = (createdCarListing) => {
    setMake("");
    setModel("");
    setYear("");
    setPrice("");
    setTrim("");
    setBodyType("");
    setExteriorColor("");
    setInteriorColor("");
    setMileage("");
    setErrors([]);

    history.push(`/car-listings/${createdCarListing.id}`);
  };

  const handleCarSelect = (selectedCar) => {
    setMake(selectedCar.Make);
    setModel(selectedCar.Model);
    setYear(selectedCar.Year);
    setBodyType(selectedCar.Category.split(',')[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      make,
      model,
      year,
      price,
      trim,
      body_type: bodyType,
      exterior_color: exteriorColor,
      interior_color: interiorColor,
      mileage,
    };

    await dispatch(createCarListing(payload))
      .then((createdCarListing) => clearData(createdCarListing))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  // Render form
  return (
    <div>

     <form className="car-listing-form" onSubmit={handleSubmit}>
  <h2>Create a Car Listing</h2>
  <Autocomplete onCarSelect={handleCarSelect} />
  {errors.length > 0 && (
    <ul className="errors-list">
      {errors.map((error, idx) => (
        <li key={idx}>{error}</li>
      ))}
    </ul>
  )}
  <label htmlFor="make">Make</label>
  <input type="text" name="make" value={make} onChange={updateMake} required />

  <label htmlFor="model">Model</label>
  <input type="text" name="model" value={model} onChange={updateModel} required />

  <label htmlFor="year">Year</label>
  <input type="number" name="year" value={year} onChange={updateYear} required />

  <label htmlFor="price">Price</label>
  <input type="number" name="price" value={price} onChange={updatePrice} required />

  <label htmlFor="trim">Trim</label>
  <input type="text" name="trim" value={trim} onChange={updateTrim} />

  <label htmlFor="bodyType">Body Type</label>
  <input type="text" name="bodyType" value={bodyType} onChange={updateBodyType} />

  <label htmlFor="exteriorColor">Exterior Color</label>
  <input type="text" name="exteriorColor" value={exteriorColor} onChange={updateExteriorColor} />

  <label htmlFor="interiorColor">Interior Color</label>
  <input type="text" name="interiorColor" value={interiorColor} onChange={updateInteriorColor} />

  <label htmlFor="mileage">Mileage</label>
  <input type="number" name="mileage" value={mileage} onChange={updateMileage} required />

  <button type="submit">Submit</button>
</form>
    </div>
  );
}
