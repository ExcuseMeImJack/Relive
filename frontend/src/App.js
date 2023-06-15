import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Spots from "./components/Spots";
import Navigation from "./components/Navigation";
import SpotDetails from "./components/Spots/SpotDetails";
import SpotManagement from "./components/Spots/SpotManagement";
import SpotCreation from "./components/Spots/SpotCreation";
import SpotUpdate from "./components/Spots/SpotUpdate";
import BookingManagement from "./components/Bookings/BookingManagement";
import Footer from "./components/Navigation/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
      <Switch>
        <Route exact path='/'>
          <Spots />
        </Route>
        <Route path='/spots/new'>
          <SpotCreation />
        </Route>
        <Route path='/spots/current'>
          <SpotManagement/>
        </Route>
        <Route path='/bookings/current'>
          <BookingManagement/>
        </Route>
        <Route exact path='/spots/:spotId'>
          <SpotDetails />
        </Route>
        <Route path='/spots/:spotId/edit'>
          <SpotUpdate />
        </Route>
        <Route>
          <h1>404 Not Found</h1>
        </Route>
      </Switch>}
    </>
  );
}

export default App;
