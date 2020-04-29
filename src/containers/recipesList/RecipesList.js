import React, { useState, useEffect } from 'react';

// Components
import Button from '../../components/button/Button';

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
          <div>{recipe.category.name}</div>
          <Button type="link" url={`/recipe/${recipe.slug}`}>Show recipe</Button>
        </div>
      ))}
    </>
  );
};

export default RecipesList;
