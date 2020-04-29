import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import Button from '../../components/button/Button';
import Field from '../../components/field/Field';

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

  const handleFieldChange = ({ target }) => {
    const { name, value } = target;

    setRecipe({
      ...recipe,
      [name]: value,
    });
  };

  return (
    <>
      <Button type="link" url="/recipes">Go back</Button>
      <Field
        tag="h1"
        value={recipe && recipe.title}
      />
      <Field
        value={recipe && recipe.description}
      />
      <Field
        value={recipe && recipe.recipe}
        label="Description:"
      />
      <Field
        value={recipe && recipe.photo}
      />
      <Field
        value={recipe && recipe.category && recipe.category.name}
      />
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
