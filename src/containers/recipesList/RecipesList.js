import React, { useState, useEffect } from 'react';

// Components
import Field from '../../components/field/Field';
import Hyperlink from '../../components/hyperlink/Hyperlink';
import Icon from '../../components/icon/Icon';

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
    <Styled.RecipesList>
      {recipesList.length && recipesList.map((recipe) => (
        <Styled.RecipeWrapper imgUrl={recipe.photo || ''} key={recipe.slug}>
          <Styled.Recipe key={recipe.slug}>
            <Styled.Title>{recipe.title}</Styled.Title>
            <div>{recipe.description}</div>
            <Styled.RecipeFooter>
              <div>{`Category: ${recipe.category.name}`}</div>
              <Hyperlink url={`/recipe/${recipe.slug}`}>
                <Icon className="arrow-right" />
                Show recipe
              </Hyperlink>
            </Styled.RecipeFooter>
          </Styled.Recipe>
        </Styled.RecipeWrapper>
      ))}
    </Styled.RecipesList>
  );
};

export default RecipesList;
