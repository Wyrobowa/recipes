import React, { useState, useEffect } from 'react';

// Services
import { fetchData } from '../services/requestService';

const RecipesList = () => {
  const [recipesList, setRecipesList] = useState([]);

  useEffect(() => {
    const getRecipesListData = async () => {
      const response = await fetchData('http://localhost:3000/recipes');
      setRecipesList(response);
    };

    getRecipesListData();
  }, []);

  return (
    <>
      <h1>Recipes List</h1>
      {recipesList.length && recipesList.map((recipe) => (
        <div key={recipe.slug}>
          <div>{recipe.title}</div>
          <div>{recipe.description}</div>
          <div>{recipe.recipe}</div>
          <div>{recipe.photo}</div>
          <div>{recipe.category.name}</div>
        </div>
      ))}
    </>
  );
};

export default RecipesList;
