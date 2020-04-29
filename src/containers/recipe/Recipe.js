import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Services
import { fetchData } from '../services/requestService';

const Recipe = ({ match }) => {
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const { slug } = match.params;

    const getRecipeData = async () => {
      const response = await fetchData(`http://localhost:3000/recipe/${slug}`);
      setRecipe(response);
    };

    getRecipeData();
  }, []);

  return (
    <>
      <h1>Recipe</h1>
      <div>{recipe.title}</div>
      <div>{recipe.description}</div>
      <div>{recipe.recipe}</div>
      <div>{recipe.photo}</div>
      <div>{recipe.category && recipe.category.name}</div>
    </>
  );
};

Recipe.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      slug: PropTypes.string,
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default Recipe;
