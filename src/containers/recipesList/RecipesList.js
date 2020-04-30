import React, { useState, useEffect } from 'react';

// Components
import Field from '../../components/field/Field';
import Hyperlink from '../../components/hyperlink/Hyperlink';

// Services
import { fetchData } from '../../services/requestService';

// Styles
import * as Styled from './recipesListStyles';

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
      <Field tag="h1" value="Recipes List" />
      <Styled.RecipesList>
        {recipesList.length && recipesList.map((recipe) => (
          <Styled.Recipe key={recipe.slug}>
            <Styled.Title>{recipe.title}</Styled.Title>
            <div>{recipe.description}</div>
            <Styled.RecipeFooter>
              <div>{`Category: ${recipe.category.name}`}</div>
              <Hyperlink url={`/recipe/${recipe.slug}`} name="Show recipe" />
            </Styled.RecipeFooter>
          </Styled.Recipe>
        ))}
      </Styled.RecipesList>
    </>
  );
};

export default RecipesList;
