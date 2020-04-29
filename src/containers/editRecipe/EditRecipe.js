import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import Hyperlink from '../../components/hyperlink/Hyperlink';
import TextField from '../../components/textField/TextField';

// Services
import { fetchData, sendData } from '../../services/requestService';
import Button from '../../components/button/Button';

const initState = {
  title: '',
  description: '',
  recipe: '',
  photo: '',
  category: '',
};

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

    console.log(recipe)
    console.log(name)
    console.log(value)

    setRecipe({
      ...recipe,
      [name]: value,
    });

    if (name === 'category') {
      setRecipe({
        ...recipe,
        category: {
          ...recipe.category,
          name: value,
        },
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await sendData('http://localhost:3000/recipe/add', 'POST', recipe);

    setRecipe(initState);
  };

  return (
    <>
      <Hyperlink url="/recipes" name="Go back" />
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
        id="category"
        onChange={handleTextFieldChange}
      />
      <Button type="submit" onClick={handleSubmit}>Submit</Button>
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
