import type { Recipe } from '../types.ts';

export const getRecipeDescription = (recipe: Recipe): string =>
  recipe.description.trim() || 'No description provided.';

export const getRecipeMeta = (recipe: Recipe): string => {
  const category = recipe.category?.name ?? 'Uncategorized';
  const productsCount = recipe.products.length;
  const calories = recipe.products.reduce(
    (total, product) => total + product.kcal * product.quantity,
    0
  );

  return `${category} | ${productsCount} ingredient${productsCount === 1 ? '' : 's'} | ${Math.round(calories)} kcal`;
};
