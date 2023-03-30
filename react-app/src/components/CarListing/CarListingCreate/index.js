import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createCarListing } from "../../../store/car_listings";
import { postCarPhotoThunk } from "../../../store/car_photos";
import Autocomplete from "../../CarAutocomplete";
import './CarListingCreate.css'

export default function CarListingForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  // Declare state for form fields
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [trim, setTrim] = useState("");
  const [body_type, setBodyType] = useState("");
  const [exterior_color, setExteriorColor] = useState("");
  const [interior_color, setInteriorColor] = useState("");
  const [mileage, setMileage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
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

    history.push(`/car_listings/${createdCarListing.id}`);
  };

  const handleCarSelect = (selectedCar) => {
    setMake(selectedCar.Make);
    setModel(selectedCar.Model);
    setYear(selectedCar.Year);
    setBodyType(selectedCar.Category.split(',')[0]);
  };

  const handleImageURLChange = (e) => {
    const url = e.target.value;
    setImageURL(url);
    setImagePreview(url);
  };


  const handleSubmit = async (e) => {
    let validationErrors = []
    e.preventDefault();

    const payload = {
      make,
      model,
      year,
      price,
      trim,
      body_type,
      exterior_color,
      interior_color,
      mileage,
    };



    const checkImageURL = (imageURL) => {
        return (
          !imageURL.endsWith(".png") &&
          !imageURL.endsWith(".jpg") &&
          !imageURL.endsWith(".jpeg")
        );
      };





      if (!imageURL) {
        validationErrors.push("Image URL is required");

      }
      else {
        if (checkImageURL(imageURL)) {
          validationErrors.push("Image URL must end in .png, .jpg, or .jpeg");

        }
      }


      if (validationErrors.length > 0) {
        setErrors(validationErrors);
      } else {
        try {
          let createdCarListing = await dispatch(createCarListing(payload));
          console.log(createCarListing)

          if (createdCarListing) {
            await dispatch(
              postCarPhotoThunk(
                {
                  car_listing_id: createdCarListing.id,
                  photo_url: imageURL,
                },
                createdCarListing.id
              )
            );

            clearData(createdCarListing);
          } else {
            console.error("Error: Car listing not created.");
          }
        } catch (res) {
          if (typeof res.json === 'function') {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          } else {
            console.error('Error:', res);
          }
        }
      }

  };

  const carColors = [
    "Black",
    "White",
    "Silver",
    "Gray",
    "Red",
    "Blue",
    "Brown",
    "Green",
    "Yellow",
    "Orange",
    "Gold",
    "Purple",
    "Other",
  ];


  const carColors2 = [
    "Black",
    "White",
    "Red",
    "Gray",
    "Tan",
    "Blue",
    "Brown",
    "Green",
    "Yellow",
    "Orange",
    "Gold",
    "Purple",
    "Other",
  ];

  const ColorOption = ({ color }) => (
    <option value={color} style={{ backgroundColor: color !== "Other" ? color : "transparent" }}>
      {color}
    </option>
  );
  // Render form
  return (

    <div>

     <form className="car-listing-form" onSubmit={handleSubmit}>
  <h2>Create a Car Listing</h2>
  <label htmlFor="make">Search</label>
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
  <input type="text" name="bodyType" value={body_type} onChange={updateBodyType} />

  <label htmlFor="exteriorColor">Exterior Color</label>
<select name="exteriorColor" value={exterior_color} onChange={updateExteriorColor}>
  {carColors.map((color) => (
    <ColorOption key={color} color={color} />
  ))}
</select>

<label htmlFor="interiorColor">Interior Color</label>
<select name="interiorColor" value={interior_color} onChange={updateInteriorColor}>
  {carColors2.map((color) => (
    <ColorOption key={color} color={color} />
  ))}
</select>

  <label htmlFor="mileage">Mileage</label>
  <input type="number" name="mileage" value={mileage} onChange={updateMileage} required />

  <br></br>
          <input
            type="text"
            placeholder="Image URL"
            value={imageURL}
            onChange={handleImageURLChange}
            className="business-form-input"
          />
          {imagePreview && <><img src={imagePreview} alt="Preview" className="image-preview" style={{
            width: "320px",
            height: "180px",
            objectFit: "cover",
          }} />
            <br></br>
          </>
          }

  <button type="submit" className="button-green">Submit</button>
</form>
    </div>
  );
}
