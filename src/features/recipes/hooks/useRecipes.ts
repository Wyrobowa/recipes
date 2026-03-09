import { useEffect, useState } from 'react';
import { fetchRecipes } from '../api/fetchRecipes.ts';
import type { Recipe } from '../model/types.ts';

type UseRecipesState = {
  recipes: Recipe[];
  isLoading: boolean;
  error: string | null;
};

export const useRecipes = (): UseRecipesState => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return { recipes, isLoading, error };
};
