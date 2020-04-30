import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import Button from '../../components/button/Button';
import ButtonsMenu from '../../components/buttonsMenu/ButtonsMenu';
import Hyperlink from '../../components/hyperlink/Hyperlink';
import TextField from '../../components/textField/TextField';

// Services
import { fetchData, sendData } from '../../services/requestService';

const initState = {
  title: '',
  description: '',
  recipe: '',
  photo: '',
  category: '',
};

const EditRecipe = ({ match }) => {
  const [recipe, setRecipe] = useState({});

  const { slug } = match.params || null;

  useEffect(() => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (slug) {
      await sendData(`http://localhost:3000/recipe/edit/${slug}`, 'PUT', recipe);
    } else {
      await sendData('http://localhost:3000/recipe/add', 'POST', recipe);
      setRecipe(initState);
    }
  };

  return (
    <>
      <ButtonsMenu>
        <Hyperlink url="/recipes" name="Go back" />
      </ButtonsMenu>
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
      <Button type="submit" model="success" onClick={handleSubmit}>Submit</Button>
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
