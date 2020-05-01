import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { ThemeProvider } from 'styled-components';

// Containers
import EditRecipe from './containers/editRecipe/EditRecipe';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import RecipesList from './containers/recipesList/RecipesList';
import Recipe from './containers/recipe/Recipe';

// Styles
import * as Styled from './appStyles';
import variables from './common/variables';

const App = () => (
  <ThemeProvider theme={variables}>
    <Styled.App>
      <Router>
        <Styled.GlobalStyle />
        <Styled.Content>
          <Header appName="Moje przepisy" />
          <Route exact path="/" component={RecipesList} />
          <Route path="/recipe/:slug" component={Recipe} />
          <Route path="/create_recipe" component={EditRecipe} />
          <Route path="/edit_recipe/:slug" component={EditRecipe} />
        </Styled.Content>
        <Footer />
      </Router>
    </Styled.App>
  </ThemeProvider>
);

export default hot(module)(App);
