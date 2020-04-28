import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

// Containers
import HomePage from './containers/homePage/HomePage';
import RecipesList from './containers/recipesList/RecipesList';

const App = () => (
  <div className="App">
    <Router>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/recipes" component={RecipesList} />
    </Router>
  </div>
);

export default hot(module)(App);
