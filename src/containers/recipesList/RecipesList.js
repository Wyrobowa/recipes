import React, { useState, useEffect } from 'react';

const RecipesList = () => {
  const [recipesList, setRecipesList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/recipes')
      .then((res) => res.json())
      .then((json) => setRecipesList(json.data));
  }, []);

  return (
    <>
      <h1>Recipes List</h1>
      {recipesList.length && recipesList.map((recipe) => (
        <div>
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
