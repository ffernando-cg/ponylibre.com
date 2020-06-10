import React from 'react';
import SignIn from './pages/SignIn';
import './App.css';
import SignUp from './pages/SignUp';
import MainPage from './pages/MainPage';
import NewPost from './pages/NewPost';
import MyOrders from './pages/MyOrders';
import MyProfile from './pages/MyProfile';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
}from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/myorders">
            <MyOrders />
          </Route>
          <Route path="/createnewpost">
            <NewPost />
          </Route>
          <Route path="/myprofile">
            <MyProfile />
            </Route>
          <Route path="/mainpage">
            <MainPage />
          </Route>
          <Route path="/register">
            <SignUp />
          </Route>
          <Route path="/login">
            <SignIn />
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
