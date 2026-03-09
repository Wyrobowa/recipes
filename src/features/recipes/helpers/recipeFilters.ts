import type { Recipe } from '../types.ts';
import { calculateRecipeNutritionTotals } from './recipeNutrition.ts';

export type RecipeFilters = {
  query: string;
  categoryId: string;
  minKcal: string;
  maxKcal: string;
  minProtein: string;
  maxProtein: string;
  minCarbs: string;
  maxCarbs: string;
  minFat: string;
  maxFat: string;
};

const normalize = (value: string): string => value.trim().toLowerCase();

const matchesCategory = (recipe: Recipe, categoryId: string): boolean => {
  if (!categoryId) {
    return true;
  }

  return String(recipe.category?.id ?? '') === categoryId;
};

const matchesQuery = (recipe: Recipe, query: string): boolean => {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) {
    return true;
  }

  const searchableText = [
    recipe.name,
    recipe.description,
    recipe.recipe,
    recipe.category?.name ?? '',
    ...recipe.products.map((product) => product.name),
  ]
    .join(' ')
    .toLowerCase();

  return searchableText.includes(normalizedQuery);
};

const parseOptionalNumber = (value: string): number | null => {
  const normalizedValue = value.trim();
  if (!normalizedValue) {
    return null;
  }

  const parsed = Number(normalizedValue);
  return Number.isFinite(parsed) ? parsed : null;
};

const matchesRange = (value: number, minValue: string, maxValue: string): boolean => {
  const normalizedValue = Math.round(value);
  const parsedMin = parseOptionalNumber(minValue);
  const parsedMax = parseOptionalNumber(maxValue);

  if (parsedMin !== null && normalizedValue < parsedMin) {
    return false;
  }

  if (parsedMax !== null && normalizedValue > parsedMax) {
    return false;
  }

  return true;
};

const matchesNutrition = (recipe: Recipe, filters: RecipeFilters): boolean => {
  const totals = calculateRecipeNutritionTotals(recipe);

  return (
    matchesRange(totals.kcal, filters.minKcal, filters.maxKcal) &&
    matchesRange(totals.protein_g, filters.minProtein, filters.maxProtein) &&
    matchesRange(totals.carbs_g, filters.minCarbs, filters.maxCarbs) &&
    matchesRange(totals.fat_g, filters.minFat, filters.maxFat)
  );
};

export const filterRecipes = (recipes: Recipe[], filters: RecipeFilters): Recipe[] =>
  recipes.filter(
    (recipe) =>
      matchesCategory(recipe, filters.categoryId) &&
      matchesQuery(recipe, filters.query) &&
      matchesNutrition(recipe, filters)
  );

export const hasActiveRecipeFilters = (filters: RecipeFilters): boolean =>
  Boolean(
    filters.categoryId ||
      normalize(filters.query) ||
      filters.minKcal.trim() ||
      filters.maxKcal.trim() ||
      filters.minProtein.trim() ||
      filters.maxProtein.trim() ||
      filters.minCarbs.trim() ||
      filters.maxCarbs.trim() ||
      filters.minFat.trim() ||
      filters.maxFat.trim()
  );
