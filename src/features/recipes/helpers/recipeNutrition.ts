import type { Recipe } from '../types.ts';

export type RecipeNutritionTotals = {
  kcal: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
};

export const calculateRecipeNutritionTotals = (recipe: Recipe): RecipeNutritionTotals =>
  recipe.products.reduce(
    (totals, product) => ({
      kcal: totals.kcal + product.kcal * product.quantity,
      protein_g: totals.protein_g + product.protein_g * product.quantity,
      carbs_g: totals.carbs_g + product.carbs_g * product.quantity,
      fat_g: totals.fat_g + product.fat_g * product.quantity,
    }),
    { kcal: 0, protein_g: 0, carbs_g: 0, fat_g: 0 }
  );
