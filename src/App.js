import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

// Containers
import HomePage from './containers/homePage/HomePage';
import RecipesList from './containers/recipesList/RecipesList';
import Recipe from './containers/recipe/Recipe';

const App = () => (
  <div className="App">
    <Router>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/recipes" component={RecipesList} />
      <Route exact path="/recipe/:slug" component={Recipe} />
    </Router>
  </div>
);

export default hot(module)(App);
