import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import Field from '../../components/field/Field';

// Services
import { fetchData } from '../../services/requestService';
import Hyperlink from '../../components/hyperlink/Hyperlink';

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
      <Hyperlink url="/recipes" name="Go back" />
      <Hyperlink url={`/edit_recipe/${slug}`} name="Edit recipe" />
      <Field tag="h1" value={recipe.title || ''} />
      <Field value={recipe.description || ''} />
      <Field value={recipe.recipe || ''} label="Description:" />
      <Field value={recipe.photo || ''} />
      <Field value={recipe.category ? recipe.category.name : ''} />
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
