import { useEffect, useState } from 'react';
import { fetchCategories } from '../../categories/index.ts';
import type { Category } from '../../categories/types.ts';
import { fetchProducts } from '../../products/index.ts';
import type { Product } from '../../products/types.ts';

type UseRecipeOptionsState = {
  categories: Category[];
  products: Product[];
  isOptionsLoading: boolean;
  optionsError: string | null;
};

export const useRecipeOptions = (): UseRecipeOptionsState => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isOptionsLoading, setIsOptionsLoading] = useState(true);
  const [optionsError, setOptionsError] = useState<string | null>(null);

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
        }
      } catch (err) {
        if (!cancelled) {
          setOptionsError(
            err instanceof Error ? err.message : 'Failed to load categories or products'
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

  return {
    categories,
    products,
    isOptionsLoading,
    optionsError,
  };
};
