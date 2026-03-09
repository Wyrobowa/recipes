import type { Recipe } from '../types.ts';

export const getRecipeDescription = (recipe: Recipe): string =>
  recipe.description.trim() || 'No description provided.';
