import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

// Containers
import HomePage from './containers/homePage/HomePage';

const App = () => (
  <div className="App">
    <h1> Hello, World! </h1>
    <Router>
      <Route exact path="/" container={HomePage} />
    </Router>
  </div>
);

export default hot(module)(App);
