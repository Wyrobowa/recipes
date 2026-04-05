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
    const controller = new AbortController();

    const loadOptions = async () => {
      try {
        setIsOptionsLoading(true);
        setOptionsError(null);

        const [loadedCategories, loadedProducts] = await Promise.all([
          fetchCategories(controller.signal),
          fetchProducts(controller.signal),
        ]);

        setCategories(loadedCategories);
        setProducts(loadedProducts);
      } catch (err) {
        if (!controller.signal.aborted) {
          setOptionsError(
            err instanceof Error ? err.message : 'Failed to load categories or products'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsOptionsLoading(false);
        }
      }
    };

    loadOptions();

    return () => {
      controller.abort();
    };
  }, []);

  return {
    categories,
    products,
    isOptionsLoading,
    optionsError,
  };
};
