import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

// Import components
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Sidebar from '../Sidebar/Sidebar';
import Tasks from '../Tasks/Tasks';
import Game from '../Game/Game';
import Deck from '../Deck/Deck';
import Stats from '../Stats/Stats';
import Help from '../Help/Help';
import AddTask from '../AddTask/AddTask';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    // Initializes stats reducer
    dispatch({
      type: 'FETCH_STATS'
    });
  }, [dispatch]);

  return (
    <Router>
      <div>
        {user.id &&
          <Sidebar />
        }
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <Tasks />
          </ProtectedRoute>

          {/* Task page */}
          <ProtectedRoute
            exact
            path="/tasks"
          >
            <Tasks />
          </ProtectedRoute>

          {/* Add Task page */}
          <ProtectedRoute
            exact
            path="/add"
          >
            <AddTask />
          </ProtectedRoute>

          {/* Game page */}
          <ProtectedRoute
            exact
            path="/game"
          >
            <Game />
          </ProtectedRoute>

          {/* Deck page */}
          <ProtectedRoute
            exact
            path="/deck"
          >
            <Deck />
          </ProtectedRoute>

          {/* Stats page */}
          <ProtectedRoute
            exact
            path="/stats"
          >
            <Stats />
          </ProtectedRoute>

          {/* Help page */}
          <ProtectedRoute
            exact
            path="/help"
          >
            <Help />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
