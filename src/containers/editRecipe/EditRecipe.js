import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import Button from '../../components/button/Button';
import TextField from '../../components/textField/TextField';

// Services
import { fetchData } from '../services/requestService';

const EditRecipe = ({ match }) => {
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const { slug } = match.params;

    const getRecipeData = async () => {
      const response = await fetchData(`http://localhost:3000/recipe/${slug}`);
      setRecipe(response);
    };

    getRecipeData();
  }, []);

  const handleTextFieldChange = ({ target }) => {
    const { name, value } = target;

    setRecipe({
      ...recipe,
      [name]: value,
    });
  };

  return (
    <>
      <Button type="link" url="/recipes">Go back</Button>
      <h1>Recipe</h1>
      <TextField
        labelText="Title"
        value={recipe && recipe.title}
        id="title"
        onChange={handleTextFieldChange}
      />
      <TextField
        labelText="Description"
        value={recipe && recipe.description}
        id="description"
        onChange={handleTextFieldChange}
      />
      <TextField
        labelText="Recipe"
        value={recipe && recipe.recipe}
        id="recipe"
        onChange={handleTextFieldChange}
      />
      <TextField
        labelText="Photo"
        value={recipe && recipe.photo}
        id="photo"
        onChange={handleTextFieldChange}
      />
      <TextField
        labelText="Category"
        value={recipe && recipe.category && recipe.category.name}
        id="category.name"
        onChange={handleTextFieldChange}
      />
    </>
  );
};

EditRecipe.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      slug: PropTypes.string,
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default EditRecipe;
