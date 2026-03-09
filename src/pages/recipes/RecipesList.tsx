import { useEffect, useState } from 'react';
import type { ApiRecipe, Recipe } from './recipes.types.tsx';
import { API_BASE_URL } from '../../consts.ts';

const RecipesList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadRecipes = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/recipes`);
        if (!response.ok) {
          throw new Error(`Failed to fetch recipes (${response.status})`);
        }

        const data: ApiRecipe[] = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Invalid recipes response');
        }

        const mappedRecipes = data.map((recipe) => ({
          id: recipe.id,
          name: recipe.title ?? recipe.name ?? 'Untitled recipe',
          description: recipe.description ?? recipe.instructions ?? '',
        }));

        if (!cancelled) {
          setRecipes(mappedRecipes);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load recipes');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadRecipes();

    return () => {
      cancelled = true;
    };
  }, []);

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
