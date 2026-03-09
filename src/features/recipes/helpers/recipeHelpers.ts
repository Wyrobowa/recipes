import type { Recipe } from '../types.ts';
import { calculateRecipeNutritionTotals } from './recipeNutrition.ts';

export const getRecipeDescription = (recipe: Recipe): string =>
  recipe.description.trim() || 'No description provided.';

export const getRecipeMeta = (recipe: Recipe): string => {
  const category = recipe.category?.name ?? 'Uncategorized';
  const productsCount = recipe.products.length;
  const nutritionTotals = calculateRecipeNutritionTotals(recipe);

  return `${category} | ${productsCount} ingredient${productsCount === 1 ? '' : 's'} | ${Math.round(nutritionTotals.kcal)} kcal`;
};
