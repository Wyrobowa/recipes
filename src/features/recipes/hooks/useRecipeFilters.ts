import { useMemo, useState } from 'react';
import type { SliderValue } from 'tharaday';
import {
  filterRecipes,
  toResetRecipeFilters,
  toNutritionBounds,
  toSliderRanges,
  isFilterActive,
  emptyRecipeFilters,
  type RecipeFilters,
} from '../helpers/recipeFilters.ts';
import type { Recipe } from '../types.ts';
import type { NutritionBounds, SliderRanges } from '../types/filters.ts';

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

export const useRecipeFilters = (recipes: Recipe[]): UseRecipeFiltersState => {
  const [rawFilters, setRawFilters] = useState<RecipeFilters>(emptyRecipeFilters);
  const [isNutritionFilterDirty, setIsNutritionFilterDirty] = useState(false);

  const nutritionBounds = useMemo(() => toNutritionBounds(recipes), [recipes]);
  const resetRecipeFilters = useMemo(
    () => toResetRecipeFilters(nutritionBounds),
    [nutritionBounds]
  );

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

  const sliderRanges = useMemo(
    () => toSliderRanges(filters, nutritionBounds),
    [filters, nutritionBounds]
  );
  const hasActive = useMemo(
    () => isFilterActive(filters, sliderRanges, nutritionBounds),
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
