import { API_BASE_URL } from '../../../app/config/env.ts';
import type { ApiRecipe, Recipe } from '../types.ts';

const normalizeRecipe = (recipe: ApiRecipe): Recipe => ({
  id: recipe.id ?? recipe._id ?? crypto.randomUUID(),
  name: recipe.title ?? recipe.name ?? 'Untitled recipe',
  description: recipe.description ?? recipe.instructions ?? recipe.recipe ?? '',
});

export const fetchRecipes = async (): Promise<Recipe[]> => {
  const response = await fetch(`${API_BASE_URL}/recipes`);

  if (!response.ok) {
    throw new Error(`Failed to fetch recipes (${response.status})`);
  }

  const payload: unknown = await response.json();
  const data = Array.isArray(payload)
    ? payload
    : typeof payload === 'object' &&
        payload !== null &&
        'data' in payload &&
        Array.isArray((payload as { data: unknown }).data)
      ? (payload as { data: unknown[] }).data
      : null;

  if (!data) {
    throw new Error('Invalid recipes response');
  }

  return data.map((item) => normalizeRecipe(item as ApiRecipe));
};
