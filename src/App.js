import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import Game from './components/browsie/game/Game';
import Getname from './components/browsie/getname/Getname';
import Livegame from './components/browsie/live/Livegame';
import { connect } from 'react-redux';
import Navbar from './components/browsie/navbar/Navbar';

function App({ name }) {
  return (
    <div className="App fcol faic">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            {name ? <Game /> : <Getname />}
          </Route>
          <Route exact path="/user">
            <Getname />
          </Route>
          <Route exact path="/:gameId">
            {name ? <Livegame /> : <Getname />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = ({ user }) => (
  {
    name: user.name,
  }
);

export default connect(mapStateToProps)(App);