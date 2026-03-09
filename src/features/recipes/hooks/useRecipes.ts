import { useEffect, useState } from 'react';
import { createRecipe as createRecipeRequest } from '../api/createRecipe.ts';
import { deleteRecipe as deleteRecipeRequest } from '../api/deleteRecipe.ts';
import { fetchRecipes } from '../api/fetchRecipes.ts';
import { updateRecipe as updateRecipeRequest } from '../api/updateRecipe.ts';
import type { Recipe, RecipePayload } from '../types.ts';

type UseRecipesState = {
  recipes: Recipe[];
  isLoading: boolean;
  error: string | null;
  isCreating: boolean;
  updatingRecipeId: Recipe['id'] | null;
  deletingRecipeId: Recipe['id'] | null;
  actionError: string | null;
  createRecipe: (input: RecipePayload) => Promise<boolean>;
  updateRecipe: (recipe: Recipe, input: RecipePayload) => Promise<boolean>;
  deleteRecipe: (recipe: Recipe) => Promise<boolean>;
};

const validateRecipePayload = (input: RecipePayload): string | null => {
  if (!input.title.trim()) {
    return 'Recipe title is required.';
  }

  if (!input.recipe.trim()) {
    return 'Recipe instructions are required.';
  }

  if (input.products.length === 0) {
    return 'At least one ingredient is required.';
  }

  const hasInvalidProduct = input.products.some(
    (product) =>
      !Number.isInteger(product.productId) ||
      product.productId <= 0 ||
      !Number.isFinite(product.quantity) ||
      product.quantity <= 0
  );

  if (hasInvalidProduct) {
    return 'Each ingredient needs a valid product and quantity greater than 0.';
  }

  return null;
};

export const useRecipes = (): UseRecipesState => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [updatingRecipeId, setUpdatingRecipeId] = useState<Recipe['id'] | null>(null);
  const [deletingRecipeId, setDeletingRecipeId] = useState<Recipe['id'] | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadRecipes = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const loadedRecipes = await fetchRecipes();
        if (!cancelled) {
          setRecipes(loadedRecipes);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load recipes');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadRecipes();

    return () => {
      cancelled = true;
    };
  }, []);

  const refreshRecipes = async (): Promise<void> => {
    const loadedRecipes = await fetchRecipes();
    setRecipes(loadedRecipes);
  };

  const createRecipe = async (input: RecipePayload): Promise<boolean> => {
    const validationError = validateRecipePayload(input);
    if (validationError) {
      setActionError(validationError);
      return false;
    }

    try {
      setIsCreating(true);
      setActionError(null);

      await createRecipeRequest(input);
      await refreshRecipes();
      return true;
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to create recipe');
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  const updateRecipe = async (recipe: Recipe, input: RecipePayload): Promise<boolean> => {
    const validationError = validateRecipePayload(input);
    if (validationError) {
      setActionError(validationError);
      return false;
    }

    try {
      setUpdatingRecipeId(recipe.id);
      setActionError(null);

      await updateRecipeRequest(recipe.slug, input);
      await refreshRecipes();
      return true;
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to update recipe');
      return false;
    } finally {
      setUpdatingRecipeId(null);
    }
  };

  const deleteRecipe = async (recipe: Recipe): Promise<boolean> => {
    try {
      setDeletingRecipeId(recipe.id);
      setActionError(null);

      await deleteRecipeRequest(recipe.slug);
      await refreshRecipes();
      return true;
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to delete recipe');
      return false;
    } finally {
      setDeletingRecipeId(null);
    }
  };

  return {
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
  };
};
