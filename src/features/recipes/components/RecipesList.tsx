import { useEffect, useState } from 'react';
import type { FormEventHandler } from 'react';
import { Box, Button, Loader, Modal, Notification, Text } from 'tharaday';
import ConfirmModal from '../../shared/components/ConfirmModal.tsx';
import RecipeFiltersPanel from './RecipeFiltersPanel.tsx';
import RecipeFormFields from './RecipeFormFields.tsx';
import RecipeListItem from './RecipeListItem.tsx';
import { toRecipePayload } from '../helpers/recipeFormHelpers.ts';
import { useRecipeFilters } from '../hooks/useRecipeFilters.ts';
import { useRecipeFormState } from '../hooks/useRecipeFormState.ts';
import { useRecipeOptions } from '../hooks/useRecipeOptions.ts';
import { useRecipes } from '../hooks/useRecipes.ts';
import type { Recipe } from '../types.ts';

type RecipesListProps = {
  isCreateModalOpen: boolean;
  onCloseCreateModal: () => void;
};

const createFormId = 'create-recipe-form';

const RecipesList = ({ isCreateModalOpen, onCloseCreateModal }: RecipesListProps) => {
  const {
    recipes,
    isLoading,
    error,
    isCreating,
    updatingRecipeId,
    deletingRecipeId,
    actionError,
    createRecipe,
    updateRecipe,
    deleteRecipe,
  } = useRecipes();

  const { categories, products, isOptionsLoading, optionsError } = useRecipeOptions();
  const {
    filters,
    filteredRecipes,
    nutritionBounds,
    sliderRanges,
    hasActiveFilters,
    setQuery,
    setCategoryFilter,
    clearFilters,
    setKcalRange,
    setProteinRange,
    setCarbsRange,
    setFatRange,
  } = useRecipeFilters(recipes);

  const [pendingDelete, setPendingDelete] = useState<Recipe | null>(null);

  const {
    newRecipeValues,
    editingRecipeId,
    editingRecipeValues,
    updateNewRecipeField,
    updateEditingField,
    updateNewIngredient,
    updateEditingIngredient,
    addNewIngredient,
    addEditingIngredient,
    removeNewIngredient,
    removeEditingIngredient,
    syncNewRecipeDefaultProduct,
    resetNewRecipeValues,
    startEditing,
    cancelEditing,
  } = useRecipeFormState();

  useEffect(() => {
    syncNewRecipeDefaultProduct(products);
  }, [products, syncNewRecipeDefaultProduct]);

  const handleCreate: FormEventHandler<HTMLElement> = async (event) => {
    event.preventDefault();

    const created = await createRecipe(toRecipePayload(newRecipeValues));
    if (created) {
      resetNewRecipeValues(products);
      onCloseCreateModal();
    }
  };

  const handleSave = async (recipe: Recipe) => {
    const updated = await updateRecipe(recipe, toRecipePayload(editingRecipeValues));
    if (updated) {
      cancelEditing();
    }
  };

  const handleDelete = (recipe: Recipe) => {
    setPendingDelete(recipe);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    const recipe = pendingDelete;
    setPendingDelete(null);

    const deleted = await deleteRecipe(recipe);
    if (deleted && editingRecipeId === recipe.id) {
      cancelEditing();
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" gap={2} paddingY={2}>
        <Loader size="sm" intent="info" />
        <Text as="p" variant="body-md" color="subtle">
          Loading recipes...
        </Text>
      </Box>
    );
  }

  if (error || optionsError) {
    return (
      <Notification intent="danger" title="Could not load recipes">
        {error ?? optionsError}
      </Notification>
    );
  }

  return (
    <>
      <ConfirmModal
        isOpen={pendingDelete !== null}
        message={`Delete recipe "${pendingDelete?.name}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />

      <Box display="grid" gap={3}>
        {actionError ? (
          <Notification intent="danger" title="Recipe action failed">
            {actionError}
          </Notification>
        ) : null}

        {recipes.length === 0 ? (
          <Notification intent="neutral" title="No recipes found">
            Add your first recipe to get started.
          </Notification>
        ) : null}

        {recipes.length > 0 ? (
          <RecipeFiltersPanel
            categories={categories}
            filters={filters}
            isOptionsLoading={isOptionsLoading}
            nutritionBounds={nutritionBounds}
            sliderRanges={sliderRanges}
            hasActiveFilters={hasActiveFilters}
            onQueryChange={setQuery}
            onCategoryFilterChange={setCategoryFilter}
            onClearFilters={clearFilters}
            onKcalRangeChange={setKcalRange}
            onProteinRangeChange={setProteinRange}
            onCarbsRangeChange={setCarbsRange}
            onFatRangeChange={setFatRange}
          />
        ) : null}

        {recipes.length > 0 && filteredRecipes.length === 0 ? (
          <Notification intent="neutral" title="No recipes match the current filters">
            Try changing or clearing your filters.
          </Notification>
        ) : null}

        <Box as="ul" display="grid" gap={3} margin={0} padding={0} style={{ listStyle: 'none' }}>
          {filteredRecipes.map((recipe) => (
            <RecipeListItem
              key={recipe.id}
              recipe={recipe}
              categories={categories}
              products={products}
              isEditing={editingRecipeId === recipe.id}
              editingValues={editingRecipeValues}
              isUpdating={updatingRecipeId === recipe.id}
              isDeleting={deletingRecipeId === recipe.id}
              onStartEditing={startEditing}
              onChangeField={updateEditingField}
              onChangeIngredient={updateEditingIngredient}
              isOptionsLoading={isOptionsLoading}
              onAddIngredient={() => addEditingIngredient(products)}
              onRemoveIngredient={removeEditingIngredient}
              onCancelEditing={cancelEditing}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          ))}
        </Box>

        <Modal
          isOpen={isCreateModalOpen}
          onClose={onCloseCreateModal}
          title="Add recipe"
          size="lg"
          footer={
            <Box display="flex" gap={2} justifyContent="flex-end" fullWidth>
              <Button variant="outline" onClick={onCloseCreateModal}>
                Cancel
              </Button>
              <Button type="submit" form={createFormId} isLoading={isCreating} intent="info">
                Add recipe
              </Button>
            </Box>
          }
        >
          <Box as="form" id={createFormId} onSubmit={handleCreate} display="grid" gap={2}>
            <RecipeFormFields
              prefix="new-recipe"
              values={newRecipeValues}
              categories={categories}
              products={products}
              titleError={actionError ?? undefined}
              isOptionsLoading={isOptionsLoading}
              onFieldChange={updateNewRecipeField}
              onIngredientChange={updateNewIngredient}
              onAddIngredient={() => addNewIngredient(products)}
              onRemoveIngredient={removeNewIngredient}
            />
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default RecipesList;
