import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllCarListings from "./components/CarListing/AllCarListings";
import SingleCarListing from "./components/CarListing/SingleCarListing";
import CarListingForm from "./components/CarListing/CarListingCreate";
import Autocomplete from "./components/CarAutocomplete";
import MyCarListings from "./components/CarListing/MyCarListings";
import EditCarListing from "./components/CarListing/CarListingEditDelete";
import CarSearch from "./components/CarSearch";
import About from "./components/About";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
            <Route exact path="/" >
            <AllCarListings />
          </Route>
             <Route path="/search" >
            <CarSearch />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/all">
            <AllCarListings />
          </Route>
          <Route exact path="/car_listings/:id">
            <SingleCarListing />
          </Route>
          <Route path="/search">
            <Autocomplete />
          </Route>
          <Route exact path="/new">
            <CarListingForm />
          </Route>
          <Route path="/my_listings">
            <MyCarListings />
          </Route>

        </Switch>

      )}
      <About />
    </>
  );
}

export default App;
