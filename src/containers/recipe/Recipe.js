import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import ButtonsMenu from '../../components/buttonsMenu/ButtonsMenu';
import Field from '../../components/field/Field';
import Hyperlink from '../../components/hyperlink/Hyperlink';

// Services
import { fetchData } from '../../services/requestService';

// Styles
import * as Styled from './recipeStyles';
import ImageField from '../../components/imageField/ImageField';

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
    <Styled.Recipe>
      <ButtonsMenu>
        <Hyperlink url="/recipes" name="Go back" />
        <Hyperlink url={`/edit_recipe/${slug}`} name="Edit recipe" />
      </ButtonsMenu>
      <Field tag="h1" value={recipe.title || ''} />
      <Field value={recipe.description || ''} />
      <Field value={recipe.recipe || ''} label="Description:" />
      <ImageField src={recipe.photo || ''} name={recipe.title} size="small" />
      <Field value={recipe.category ? recipe.category.name : ''} />
    </Styled.Recipe>
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
