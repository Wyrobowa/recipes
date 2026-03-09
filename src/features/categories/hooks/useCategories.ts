import { useEffect, useState } from 'react';
import { fetchCategories } from '../api/fetchCategories.ts';
import type { Category } from '../types.ts';

type UseCategoriesState = {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
};

export const useCategories = (): UseCategoriesState => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return { categories, isLoading, error };
};
