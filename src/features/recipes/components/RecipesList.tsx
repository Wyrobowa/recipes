import { useEffect, useState } from 'react';
import type { FormEventHandler } from 'react';
import { Box, Button, Input, Loader, Notification, Text } from 'tharaday';
import { fetchCategories } from '../../categories/index.ts';
import type { Category } from '../../categories/types.ts';
import { fetchProducts } from '../../products/index.ts';
import type { Product } from '../../products/types.ts';
import {
  createEmptyRecipeFormValues,
  defaultIngredientProductId,
  toRecipeFormValues,
  toRecipePayload,
  type RecipeFormValues,
} from '../helpers/recipeFormHelpers.ts';
import RecipeListItem from './RecipeListItem.tsx';
import { useRecipes } from '../hooks/useRecipes.ts';
import type { Recipe } from '../types.ts';

const RecipesList = () => {
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

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isOptionsLoading, setIsOptionsLoading] = useState(true);
  const [optionsError, setOptionsError] = useState<string | null>(null);

  const [newRecipeValues, setNewRecipeValues] = useState<RecipeFormValues>(
    createEmptyRecipeFormValues(),
  );
  const [editingRecipeId, setEditingRecipeId] = useState<string | null>(null);
  const [editingRecipeValues, setEditingRecipeValues] = useState<RecipeFormValues>(
    createEmptyRecipeFormValues(),
  );

  useEffect(() => {
    let cancelled = false;

    const loadOptions = async () => {
      try {
        setIsOptionsLoading(true);
        setOptionsError(null);

        const [loadedCategories, loadedProducts] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
        ]);

        if (!cancelled) {
          setCategories(loadedCategories);
          setProducts(loadedProducts);
          setNewRecipeValues((current) => {
            if (current.ingredients[0]?.productId || loadedProducts.length === 0) {
              return current;
            }

            return {
              ...current,
              ingredients: [
                {
                  productId: defaultIngredientProductId(loadedProducts),
                  quantity: current.ingredients[0]?.quantity ?? '1',
                },
              ],
            };
          });
        }
      } catch (err) {
        if (!cancelled) {
          setOptionsError(
            err instanceof Error ? err.message : 'Failed to load categories or products',
          );
        }
      } finally {
        if (!cancelled) {
          setIsOptionsLoading(false);
        }
      }
    };

    loadOptions();

    return () => {
      cancelled = true;
    };
  }, []);

  const updateNewRecipeField = (
    field: Exclude<keyof RecipeFormValues, 'ingredients'>,
    value: string,
  ) => {
    setNewRecipeValues((current) => ({ ...current, [field]: value }));
  };

  const updateEditingField = (
    field: Exclude<keyof RecipeFormValues, 'ingredients'>,
    value: string,
  ) => {
    setEditingRecipeValues((current) => ({ ...current, [field]: value }));
  };

  const updateIngredient = (
    values: RecipeFormValues,
    index: number,
    field: 'productId' | 'quantity',
    value: string,
  ): RecipeFormValues => ({
    ...values,
    ingredients: values.ingredients.map((ingredient, ingredientIndex) =>
      ingredientIndex === index ? { ...ingredient, [field]: value } : ingredient,
    ),
  });

  const updateNewIngredient = (index: number, field: 'productId' | 'quantity', value: string) => {
    setNewRecipeValues((current) => updateIngredient(current, index, field, value));
  };

  const updateEditingIngredient = (
    index: number,
    field: 'productId' | 'quantity',
    value: string,
  ) => {
    setEditingRecipeValues((current) => updateIngredient(current, index, field, value));
  };

  const addIngredient = (target: 'new' | 'edit') => {
    const nextIngredient = {
      productId: defaultIngredientProductId(products),
      quantity: '1',
    };

    if (target === 'new') {
      setNewRecipeValues((current) => ({
        ...current,
        ingredients: [...current.ingredients, nextIngredient],
      }));
      return;
    }

    setEditingRecipeValues((current) => ({
      ...current,
      ingredients: [...current.ingredients, nextIngredient],
    }));
  };

  const removeIngredient = (target: 'new' | 'edit', index: number) => {
    const removeFromValues = (values: RecipeFormValues): RecipeFormValues => {
      if (values.ingredients.length === 1) {
        return values;
      }

      return {
        ...values,
        ingredients: values.ingredients.filter((_, ingredientIndex) => ingredientIndex !== index),
      };
    };

    if (target === 'new') {
      setNewRecipeValues((current) => removeFromValues(current));
      return;
    }

    setEditingRecipeValues((current) => removeFromValues(current));
  };

  const handleCreate: FormEventHandler<HTMLElement> = async (event) => {
    event.preventDefault();

    const created = await createRecipe(toRecipePayload(newRecipeValues));
    if (created) {
      setNewRecipeValues({
        ...createEmptyRecipeFormValues(),
        ingredients: [
          {
            productId: defaultIngredientProductId(products),
            quantity: '1',
          },
        ],
      });
    }
  };

  const startEditing = (recipe: Recipe) => {
    setEditingRecipeId(String(recipe.id));
    setEditingRecipeValues(toRecipeFormValues(recipe));
  };

  const cancelEditing = () => {
    setEditingRecipeId(null);
    setEditingRecipeValues(createEmptyRecipeFormValues());
  };

  const handleSave = async (recipe: Recipe) => {
    const updated = await updateRecipe(recipe, toRecipePayload(editingRecipeValues));
    if (updated) {
      cancelEditing();
    }
  };

  const handleDelete = async (recipe: Recipe) => {
    const confirmed = window.confirm(`Delete recipe "${recipe.name}"?`);
    if (!confirmed) {
      return;
    }

    const deleted = await deleteRecipe(recipe);
    if (deleted && editingRecipeId === String(recipe.id)) {
      cancelEditing();
    }
  };

  if (isLoading || isOptionsLoading) {
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
    <Box display="grid" gap={3}>
      <Box as="form" onSubmit={handleCreate} display="grid" gap={2}>
        <Input
          id="new-recipe-title"
          label="Title"
          placeholder="e.g. Omelette"
          value={newRecipeValues.title}
          onChange={(event) => updateNewRecipeField('title', event.target.value)}
          error={Boolean(actionError)}
          helperText={actionError ?? undefined}
          fullWidth
        />
        <Input
          id="new-recipe-description"
          label="Description"
          placeholder="Short summary"
          value={newRecipeValues.description}
          onChange={(event) => updateNewRecipeField('description', event.target.value)}
          fullWidth
        />
        <Input
          id="new-recipe-text"
          label="Instructions"
          placeholder="Recipe instructions"
          value={newRecipeValues.recipe}
          onChange={(event) => updateNewRecipeField('recipe', event.target.value)}
          fullWidth
        />
        <Input
          id="new-recipe-photo"
          label="Photo URL"
          placeholder="https://..."
          value={newRecipeValues.photo}
          onChange={(event) => updateNewRecipeField('photo', event.target.value)}
          fullWidth
        />

        <label htmlFor="new-recipe-category">
          <Text as="span" variant="body-sm">
            Category
          </Text>
        </label>
        <select
          id="new-recipe-category"
          value={newRecipeValues.categoryId}
          onChange={(event) => updateNewRecipeField('categoryId', event.target.value)}
        >
          <option value="">No category</option>
          {categories.map((category) => (
            <option key={category.id} value={String(category.id)}>
              {category.name}
            </option>
          ))}
        </select>

        <Text as="p" variant="body-sm" weight="bold">
          Ingredients
        </Text>
        {newRecipeValues.ingredients.map((ingredient, index) => (
          <Box key={`new-ingredient-${index}`} display="grid" gap={1}>
            <select
              value={ingredient.productId}
              onChange={(event) => updateNewIngredient(index, 'productId', event.target.value)}
            >
              <option value="">Select product</option>
              {products.map((product) => (
                <option key={product.id} value={String(product.id)}>
                  {product.name}
                </option>
              ))}
            </select>
            <Input
              id={`new-ingredient-${index}-quantity`}
              type="number"
              label="Quantity"
              value={ingredient.quantity}
              onChange={(event) => updateNewIngredient(index, 'quantity', event.target.value)}
              fullWidth
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                type="button"
                variant="outline"
                intent="danger"
                disabled={newRecipeValues.ingredients.length === 1}
                onClick={() => removeIngredient('new', index)}
              >
                Remove ingredient
              </Button>
            </Box>
          </Box>
        ))}

        <Box display="flex" justifyContent="space-between" gap={2}>
          <Button type="button" variant="outline" onClick={() => addIngredient('new')}>
            Add ingredient
          </Button>
          <Button type="submit" isLoading={isCreating} intent="info">
            Add recipe
          </Button>
        </Box>
      </Box>

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

      <Box as="ul" display="grid" gap={3} margin={0} padding={0} style={{ listStyle: 'none' }}>
        {recipes.map((recipe) => (
          <RecipeListItem
            key={recipe.id}
            recipe={recipe}
            categories={categories}
            products={products}
            isEditing={editingRecipeId === String(recipe.id)}
            editingValues={editingRecipeValues}
            isUpdating={updatingRecipeId === recipe.id}
            isDeleting={deletingRecipeId === recipe.id}
            onStartEditing={startEditing}
            onChangeField={updateEditingField}
            onChangeIngredient={updateEditingIngredient}
            onAddIngredient={() => addIngredient('edit')}
            onRemoveIngredient={(index) => removeIngredient('edit', index)}
            onCancelEditing={cancelEditing}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))}
      </Box>
    </Box>
  );
};

export default RecipesList;
