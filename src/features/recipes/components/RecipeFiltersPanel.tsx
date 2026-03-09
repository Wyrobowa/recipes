import { useEffect, useRef, useState } from 'react';
import { Box, Button, Input, Slider } from 'tharaday';
import type { SliderValue } from 'tharaday';
import type { Category } from '../../categories/types.ts';
import SearchableSelect from '../../shared/components/SearchableSelect.tsx';
import type { RecipeFilters } from '../helpers/recipeFilters.ts';

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

type RecipeFiltersPanelProps = {
  categories: Category[];
  filters: RecipeFilters;
  nutritionBounds: NutritionBounds;
  sliderRanges: SliderRanges;
  hasActiveFilters: boolean;
  onQueryChange: (value: string) => void;
  onCategoryFilterChange: (value: string) => void;
  onClearFilters: () => void;
  onKcalRangeChange: (value: SliderValue) => void;
  onProteinRangeChange: (value: SliderValue) => void;
  onCarbsRangeChange: (value: SliderValue) => void;
  onFatRangeChange: (value: SliderValue) => void;
};

const toRangeSummary = (range: [number, number], maxBound: number): string =>
  `Min: ${range[0]} | Max: ${range[1]} (bounds: 0-${maxBound})`;

const RecipeFiltersPanel = ({
  categories,
  filters,
  nutritionBounds,
  sliderRanges,
  hasActiveFilters,
  onQueryChange,
  onCategoryFilterChange,
  onClearFilters,
  onKcalRangeChange,
  onProteinRangeChange,
  onCarbsRangeChange,
  onFatRangeChange,
}: RecipeFiltersPanelProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(hasActiveFilters);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={rootRef} style={{ position: 'relative' }}>
      <Box display="flex" gap={2} alignItems="center">
        <Button
          type="button"
          variant={hasActiveFilters ? 'solid' : 'subtle'}
          intent={hasActiveFilters ? 'info' : 'neutral'}
          onClick={() => setIsOpen((current) => !current)}
        >
          {hasActiveFilters ? 'Filters (active)' : 'Filters'}
          {isOpen ? ' ▲' : ' ▼'}
        </Button>
        <Button
          type="button"
          variant="subtle"
          intent="danger"
          disabled={!hasActiveFilters}
          onClick={onClearFilters}
        >
          Clear filters
        </Button>
      </Box>

      {isOpen ? (
        <Box padding={4}>
          <Box display="grid" gap={3}>
            <Box display="grid" gap={4}>
              <Input
                id="recipes-filter-query"
                label="Search recipes"
                placeholder="Search by title, description, category, or ingredient"
                value={filters.query}
                onChange={(event) => onQueryChange(event.target.value)}
                fullWidth
              />
              <SearchableSelect
                id="recipes-filter-category"
                label="Category filter"
                value={filters.categoryId}
                onValueChange={onCategoryFilterChange}
                options={[
                  { value: '', label: 'All categories' },
                  ...categories.map((category) => ({
                    value: String(category.id),
                    label: category.name,
                  })),
                ]}
              />
            </Box>

            <Box
              display="grid"
              gap={8}
              gridTemplateColumns="repeat(auto-fit, minmax(360px, 1fr))"
              justifyContent="flex-start"
            >
              <Slider
                id="recipes-filter-kcal-range"
                label="Total kcal"
                min={0}
                max={nutritionBounds.kcal}
                step={1}
                showValue
                helperText={toRangeSummary(sliderRanges.kcal, nutritionBounds.kcal)}
                fullWidth
                value={sliderRanges.kcal}
                onValueChange={onKcalRangeChange}
              />
              <Slider
                id="recipes-filter-protein-range"
                label="Total protein (g)"
                min={0}
                max={nutritionBounds.protein}
                step={1}
                showValue
                helperText={toRangeSummary(sliderRanges.protein, nutritionBounds.protein)}
                fullWidth
                value={sliderRanges.protein}
                onValueChange={onProteinRangeChange}
              />
              <Slider
                id="recipes-filter-carbs-range"
                label="Total carbs (g)"
                min={0}
                max={nutritionBounds.carbs}
                step={1}
                showValue
                helperText={toRangeSummary(sliderRanges.carbs, nutritionBounds.carbs)}
                fullWidth
                value={sliderRanges.carbs}
                onValueChange={onCarbsRangeChange}
              />
              <Slider
                id="recipes-filter-fat-range"
                label="Total fat (g)"
                min={0}
                max={nutritionBounds.fat}
                step={1}
                showValue
                helperText={toRangeSummary(sliderRanges.fat, nutritionBounds.fat)}
                fullWidth
                value={sliderRanges.fat}
                onValueChange={onFatRangeChange}
              />
            </Box>
          </Box>
        </Box>
      ) : null}
    </div>
  );
};

export default RecipeFiltersPanel;
