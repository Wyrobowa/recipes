import { useCallback, useState } from 'react';
import { Box, Button, Input } from 'tharaday';
import type { SliderValue } from 'tharaday';
import type { Category } from '../../categories/types.ts';
import SearchableSelect from '../../shared/components/SearchableSelect.tsx';
import { useClickOutside } from '../../shared/hooks/useClickOutside.ts';
import type { RecipeFilters } from '../helpers/recipeFilters.ts';
import type { NutritionBounds, SliderRanges } from '../types/filters.ts';
import { NutritionSlider } from './NutritionSlider.tsx';

type NutritionHandlers = {
  onKcalRangeChange: (value: SliderValue) => void;
  onProteinRangeChange: (value: SliderValue) => void;
  onCarbsRangeChange: (value: SliderValue) => void;
  onFatRangeChange: (value: SliderValue) => void;
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
} & NutritionHandlers;

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
  const [isOpen, setIsOpen] = useState(hasActiveFilters);
  const handleClose = useCallback(() => setIsOpen(false), []);
  const rootRef = useClickOutside<HTMLDivElement>(handleClose, isOpen);

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
              <NutritionSlider
                id="recipes-filter-kcal-range"
                label="Total kcal"
                max={nutritionBounds.kcal}
                value={sliderRanges.kcal}
                onValueChange={onKcalRangeChange}
              />
              <NutritionSlider
                id="recipes-filter-protein-range"
                label="Total protein (g)"
                max={nutritionBounds.protein}
                value={sliderRanges.protein}
                onValueChange={onProteinRangeChange}
              />
              <NutritionSlider
                id="recipes-filter-carbs-range"
                label="Total carbs (g)"
                max={nutritionBounds.carbs}
                value={sliderRanges.carbs}
                onValueChange={onCarbsRangeChange}
              />
              <NutritionSlider
                id="recipes-filter-fat-range"
                label="Total fat (g)"
                max={nutritionBounds.fat}
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
