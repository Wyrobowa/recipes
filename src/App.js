import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

// Containers
import EditRecipe from './containers/editRecipe/EditRecipe';
import Footer from './containers/footer/Footer';
import Header from './containers/header/Header';
import HomePage from './containers/homePage/HomePage';
import RecipesList from './containers/recipesList/RecipesList';
import Recipe from './containers/recipe/Recipe';

const App = () => (
  <div className="App">
    <Router>
      <Header appName="Moje przepisy" />
      <Route exact path="/" component={HomePage} />
      <Route path="/recipes" component={RecipesList} />
      <Route path="/recipe/:slug" component={Recipe} />
      <Route path="/create_recipe" component={EditRecipe} />
      <Route path="/edit_recipe/:slug" component={EditRecipe} />
      <Footer />
    </Router>
  </div>
);

export default hot(module)(App);
