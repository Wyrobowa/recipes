import { API_BASE_URL } from '../../consts.ts';
import type { ApiRecipe, Recipe } from './recipes.types.ts';

const normalizeRecipe = (recipe: ApiRecipe): Recipe => ({
  id: recipe.id,
  name: recipe.title ?? recipe.name ?? 'Untitled recipe',
  description: recipe.description ?? recipe.instructions ?? '',
});

export const fetchRecipes = async (): Promise<Recipe[]> => {
  const response = await fetch(`${API_BASE_URL}/recipes`);

  if (!response.ok) {
    throw new Error(`Failed to fetch recipes (${response.status})`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('Invalid recipes response');
  }

  return data.map((item) => normalizeRecipe(item as ApiRecipe));
};
