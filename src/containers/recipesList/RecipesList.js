import React, { useState, useEffect } from 'react';

// Components
import Hyperlink from '../../components/hyperlink/Hyperlink';

// Services
import { fetchData } from '../../services/requestService';

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
          <Hyperlink url={`/recipe/${recipe.slug}`} name="Show recipe" />
        </div>
      ))}
    </>
  );
};

export default RecipesList;
