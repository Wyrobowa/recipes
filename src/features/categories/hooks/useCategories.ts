import { useEffect, useState } from 'react';
import { createCategory as createCategoryRequest } from '../api/createCategory.ts';
import { deleteCategory as deleteCategoryRequest } from '../api/deleteCategory.ts';
import { fetchCategories } from '../api/fetchCategories.ts';
import { updateCategory as updateCategoryRequest } from '../api/updateCategory.ts';
import type { Category } from '../types.ts';

type UseCategoriesState = {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  isCreating: boolean;
  updatingCategoryId: Category['id'] | null;
  deletingCategoryId: Category['id'] | null;
  actionError: string | null;
  createCategory: (name: string) => Promise<boolean>;
  updateCategory: (id: Category['id'], name: string) => Promise<boolean>;
  deleteCategory: (id: Category['id']) => Promise<boolean>;
};

export const useCategories = (): UseCategoriesState => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [updatingCategoryId, setUpdatingCategoryId] = useState<Category['id'] | null>(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState<Category['id'] | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const loadedCategories = await fetchCategories();
        if (!cancelled) {
          setCategories(loadedCategories);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load categories');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  const refreshCategories = async (): Promise<void> => {
    const loadedCategories = await fetchCategories();
    setCategories(loadedCategories);
  };

  const createCategory = async (name: string): Promise<boolean> => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setActionError('Category name is required.');
      return false;
    }

    try {
      setIsCreating(true);
      setActionError(null);

      await createCategoryRequest(trimmedName);
      await refreshCategories();
      return true;
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to create category');
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  const updateCategory = async (
    id: Category['id'],
    name: string,
  ): Promise<boolean> => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setActionError('Category name is required.');
      return false;
    }

    try {
      setUpdatingCategoryId(id);
      setActionError(null);

      await updateCategoryRequest(id, trimmedName);
      await refreshCategories();
      return true;
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to update category');
      return false;
    } finally {
      setUpdatingCategoryId(null);
    }
  };

  const deleteCategory = async (id: Category['id']): Promise<boolean> => {
    try {
      setDeletingCategoryId(id);
      setActionError(null);

      await deleteCategoryRequest(id);
      await refreshCategories();
      return true;
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to delete category');
      return false;
    } finally {
      setDeletingCategoryId(null);
    }
  };

  return {
    categories,
    isLoading,
    error,
    isCreating,
    updatingCategoryId,
    deletingCategoryId,
    actionError,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
