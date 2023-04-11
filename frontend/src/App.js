import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Spots from "./components/Spots";
import Navigation from "./components/Navigation";
import SpotDetails from "./components/Spots/SpotDetails";
import SpotCreationForm from "./components/Spots/SpotCreationForm"

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
          <SpotCreationForm />
        </Route>
        <Route exact path='/spots/:spotId'>
          <SpotDetails />
        </Route>
      </Switch>}
    </>
  );
}

export default App;
