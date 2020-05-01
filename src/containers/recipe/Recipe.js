import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import Banner from '../../components/banner/Banner';
import ButtonsMenu from '../../components/buttonsMenu/ButtonsMenu';
import Field from '../../components/field/Field';

import Hyperlink from '../../components/hyperlink/Hyperlink';
// Services

import { fetchData } from '../../services/requestService';
// Styles
import * as Styled from './recipeStyles';

const Recipe = ({ match }) => {
  const [recipe, setRecipe] = useState({});

  const { slug } = match.params;

  useEffect(() => {
    const getRecipeData = async () => {
      const response = await fetchData(`http://localhost:3000/recipe/${slug}`);
      setRecipe(response);
    };

    getRecipeData();
  }, []);

  return (
    <>
      <ButtonsMenu>
        <Hyperlink url="/recipes" name="Go back" />
        <Hyperlink url={`/edit_recipe/${slug}`} name="Edit recipe" />
      </ButtonsMenu>
      <Styled.Recipe>
        <Styled.RecipeHeader>
          <Banner imgUrl={recipe.photo || ''} />
          <Styled.RecipeHeaderWrapper>
            <Field tag="h1" value={recipe.title || ''} title />
            <Field value={recipe.category ? recipe.category.name : ''} />
          </Styled.RecipeHeaderWrapper>
        </Styled.RecipeHeader>
        <Field value={recipe.description || ''} label="Description:" />
        <Field value={recipe.recipe || ''} />
      </Styled.Recipe>
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
