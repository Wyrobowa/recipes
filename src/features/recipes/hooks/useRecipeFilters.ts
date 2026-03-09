import { useMemo, useState } from 'react';
import type { SliderValue } from 'tharaday';
import { filterRecipes, type RecipeFilters } from '../helpers/recipeFilters.ts';
import { calculateRecipeNutritionTotals } from '../helpers/recipeNutrition.ts';
import type { Recipe } from '../types.ts';

type NutritionBounds = {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

type SliderRanges = {
  kcal: [number, number];
  protein: [number, number];
  carbs: [number, number];
  fat: [number, number];
};

type UseRecipeFiltersState = {
  filters: RecipeFilters;
  filteredRecipes: Recipe[];
  nutritionBounds: NutritionBounds;
  sliderRanges: SliderRanges;
  hasActiveFilters: boolean;
  setQuery: (value: string) => void;
  setCategoryFilter: (value: string) => void;
  clearFilters: () => void;
  setKcalRange: (value: SliderValue) => void;
  setProteinRange: (value: SliderValue) => void;
  setCarbsRange: (value: SliderValue) => void;
  setFatRange: (value: SliderValue) => void;
};

const emptyRecipeFilters: RecipeFilters = {
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

const toNumberOrDefault = (value: string, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const toSliderRangeValue = (
  minValue: string,
  maxValue: string,
  maxBound: number
): [number, number] => [toNumberOrDefault(minValue, 0), toNumberOrDefault(maxValue, maxBound)];

const toResetRecipeFilters = (bounds: NutritionBounds): RecipeFilters => ({
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

const toNutritionBounds = (recipes: Recipe[]): NutritionBounds => {
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

const toSliderRanges = (filters: RecipeFilters, bounds: NutritionBounds): SliderRanges => ({
  kcal: toSliderRangeValue(filters.minKcal, filters.maxKcal, bounds.kcal),
  protein: toSliderRangeValue(filters.minProtein, filters.maxProtein, bounds.protein),
  carbs: toSliderRangeValue(filters.minCarbs, filters.maxCarbs, bounds.carbs),
  fat: toSliderRangeValue(filters.minFat, filters.maxFat, bounds.fat),
});

const hasActiveFilters = (
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

export const useRecipeFilters = (recipes: Recipe[]): UseRecipeFiltersState => {
  const [rawFilters, setRawFilters] = useState<RecipeFilters>(emptyRecipeFilters);
  const [isNutritionFilterDirty, setIsNutritionFilterDirty] = useState(false);

  const nutritionBounds = useMemo(() => toNutritionBounds(recipes), [recipes]);
  const resetRecipeFilters = useMemo(() => toResetRecipeFilters(nutritionBounds), [nutritionBounds]);

  const filters = useMemo(() => {
    if (!isNutritionFilterDirty) {
      return {
        ...rawFilters,
        minKcal: resetRecipeFilters.minKcal,
        maxKcal: resetRecipeFilters.maxKcal,
        minProtein: resetRecipeFilters.minProtein,
        maxProtein: resetRecipeFilters.maxProtein,
        minCarbs: resetRecipeFilters.minCarbs,
        maxCarbs: resetRecipeFilters.maxCarbs,
        minFat: resetRecipeFilters.minFat,
        maxFat: resetRecipeFilters.maxFat,
      };
    }

    return {
      ...rawFilters,
      minKcal: rawFilters.minKcal || '0',
      maxKcal: rawFilters.maxKcal || String(nutritionBounds.kcal),
      minProtein: rawFilters.minProtein || '0',
      maxProtein: rawFilters.maxProtein || String(nutritionBounds.protein),
      minCarbs: rawFilters.minCarbs || '0',
      maxCarbs: rawFilters.maxCarbs || String(nutritionBounds.carbs),
      minFat: rawFilters.minFat || '0',
      maxFat: rawFilters.maxFat || String(nutritionBounds.fat),
    };
  }, [isNutritionFilterDirty, nutritionBounds, rawFilters, resetRecipeFilters]);

  const sliderRanges = useMemo(() => toSliderRanges(filters, nutritionBounds), [filters, nutritionBounds]);
  const hasActive = useMemo(
    () => hasActiveFilters(filters, sliderRanges, nutritionBounds),
    [filters, nutritionBounds, sliderRanges]
  );
  const filteredRecipes = useMemo(() => filterRecipes(recipes, filters), [filters, recipes]);

  const setRange = (
    minField: keyof Pick<RecipeFilters, 'minKcal' | 'minProtein' | 'minCarbs' | 'minFat'>,
    maxField: keyof Pick<RecipeFilters, 'maxKcal' | 'maxProtein' | 'maxCarbs' | 'maxFat'>,
    value: SliderValue
  ) => {
    if (!Array.isArray(value)) {
      return;
    }

    const [nextMin, nextMax] = value;
    setIsNutritionFilterDirty(true);
    setRawFilters((current) => ({
      ...current,
      [minField]: String(nextMin),
      [maxField]: String(nextMax),
    }));
  };

  return {
    filters,
    filteredRecipes,
    nutritionBounds,
    sliderRanges,
    hasActiveFilters: hasActive,
    setQuery: (value: string) => setRawFilters((current) => ({ ...current, query: value })),
    setCategoryFilter: (value: string) =>
      setRawFilters((current) => ({ ...current, categoryId: value })),
    clearFilters: () => {
      setIsNutritionFilterDirty(false);
      setRawFilters(emptyRecipeFilters);
    },
    setKcalRange: (value: SliderValue) => setRange('minKcal', 'maxKcal', value),
    setProteinRange: (value: SliderValue) => setRange('minProtein', 'maxProtein', value),
    setCarbsRange: (value: SliderValue) => setRange('minCarbs', 'maxCarbs', value),
    setFatRange: (value: SliderValue) => setRange('minFat', 'maxFat', value),
  };
};
