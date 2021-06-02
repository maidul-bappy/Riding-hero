import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Destination from "./Components/Destination/Destination";
import Home from "./Components/Home/Home";
import LogIn from "./Components/Login/LogIn";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home></Home>
        </Route>
        <PrivateRoute path='/destination/:id'>
          <Destination></Destination>
        </PrivateRoute>
        <Route path='/login'>
          <LogIn></LogIn>
        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
};

export default App;