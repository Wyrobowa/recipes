import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

// Containers
import HomePage from './containers/homePage/HomePage';

const App = () => (
  <div className="App">
    <Router>
      <Route exact path="/" component={HomePage} />
      <Route path="/recipes" component={HomePage} />
    </Router>
  </div>
);

export default hot(module)(App);
