import { useRecipes } from './useRecipes.ts';

const RecipesList = () => {
  const { recipes, isLoading, error } = useRecipes();

  if (isLoading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (recipes.length === 0) {
    return <p>No recipes found.</p>;
  }

  return (
    <ul className="recipes-list">
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <div>
            <strong>{recipe.name}</strong>
            <p>{recipe.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RecipesList;
