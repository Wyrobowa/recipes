import type { Recipe } from '../types.ts';
import type { NutritionBounds, SliderRanges } from '../types/filters.ts';
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

export const emptyRecipeFilters: RecipeFilters = {
  query: '',
  categoryId: '',
  minKcal: '',
  maxKcal: '',
  minProtein: '',
  maxProtein: '',
  minCarbs: '',
  maxCarbs: '',
  minFat: '',
  maxFat: '',
};

export const toNumberOrDefault = (value: string, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const toSliderRangeValue = (
  minValue: string,
  maxValue: string,
  maxBound: number
): [number, number] => [toNumberOrDefault(minValue, 0), toNumberOrDefault(maxValue, maxBound)];

export const toResetRecipeFilters = (bounds: NutritionBounds): RecipeFilters => ({
  ...emptyRecipeFilters,
  minKcal: '0',
  maxKcal: String(bounds.kcal),
  minProtein: '0',
  maxProtein: String(bounds.protein),
  minCarbs: '0',
  maxCarbs: String(bounds.carbs),
  minFat: '0',
  maxFat: String(bounds.fat),
});

export const toNutritionBounds = (recipes: Recipe[]): NutritionBounds => {
  const maxValues = recipes.reduce(
    (currentMax, recipe) => {
      const totals = calculateRecipeNutritionTotals(recipe);

      return {
        kcal: Math.max(currentMax.kcal, totals.kcal),
        protein: Math.max(currentMax.protein, totals.protein_g),
        carbs: Math.max(currentMax.carbs, totals.carbs_g),
        fat: Math.max(currentMax.fat, totals.fat_g),
      };
    },
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return {
    kcal: Math.max(1, Math.ceil(maxValues.kcal)),
    protein: Math.max(1, Math.ceil(maxValues.protein)),
    carbs: Math.max(1, Math.ceil(maxValues.carbs)),
    fat: Math.max(1, Math.ceil(maxValues.fat)),
  };
};

export const toSliderRanges = (filters: RecipeFilters, bounds: NutritionBounds): SliderRanges => ({
  kcal: toSliderRangeValue(filters.minKcal, filters.maxKcal, bounds.kcal),
  protein: toSliderRangeValue(filters.minProtein, filters.maxProtein, bounds.protein),
  carbs: toSliderRangeValue(filters.minCarbs, filters.maxCarbs, bounds.carbs),
  fat: toSliderRangeValue(filters.minFat, filters.maxFat, bounds.fat),
});

export const isFilterActive = (
  filters: RecipeFilters,
  sliderRanges: SliderRanges,
  nutritionBounds: NutritionBounds
): boolean => {
  const hasTextFilters = Boolean(filters.query.trim() || filters.categoryId);
  const hasNutritionFilters =
    sliderRanges.kcal[0] !== 0 ||
    sliderRanges.kcal[1] !== nutritionBounds.kcal ||
    sliderRanges.protein[0] !== 0 ||
    sliderRanges.protein[1] !== nutritionBounds.protein ||
    sliderRanges.carbs[0] !== 0 ||
    sliderRanges.carbs[1] !== nutritionBounds.carbs ||
    sliderRanges.fat[0] !== 0 ||
    sliderRanges.fat[1] !== nutritionBounds.fat;

  return hasTextFilters || hasNutritionFilters;
};

export const filterRecipes = (recipes: Recipe[], filters: RecipeFilters): Recipe[] =>
  recipes.filter(
    (recipe) =>
      matchesCategory(recipe, filters.categoryId) &&
      matchesQuery(recipe, filters.query) &&
      matchesNutrition(recipe, filters)
  );
