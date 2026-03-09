import { useEffect, useState } from 'react';
import { createProduct as createProductRequest } from '../api/createProduct.ts';
import { deleteProduct as deleteProductRequest } from '../api/deleteProduct.ts';
import { fetchProducts } from '../api/fetchProducts.ts';
import { updateProduct as updateProductRequest } from '../api/updateProduct.ts';
import type { Product, ProductPayload } from '../types.ts';

type UseProductsState = {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  isCreating: boolean;
  updatingProductId: Product['id'] | null;
  deletingProductId: Product['id'] | null;
  actionError: string | null;
  createProduct: (input: ProductPayload) => Promise<boolean>;
  updateProduct: (id: Product['id'], input: ProductPayload) => Promise<boolean>;
  deleteProduct: (id: Product['id']) => Promise<boolean>;
};

const validateProductPayload = (input: ProductPayload): string | null => {
  if (!input.name.trim()) {
    return 'Product name is required.';
  }

  if (!input.unit.trim()) {
    return 'Product unit is required.';
  }

  if (!Number.isFinite(input.kcal) || input.kcal < 0) {
    return 'Calories must be a number greater than or equal to 0.';
  }

  if (!Number.isFinite(input.protein_g) || input.protein_g < 0) {
    return 'Protein must be a number greater than or equal to 0.';
  }

  if (!Number.isFinite(input.carbs_g) || input.carbs_g < 0) {
    return 'Carbohydrates must be a number greater than or equal to 0.';
  }

  if (!Number.isFinite(input.fat_g) || input.fat_g < 0) {
    return 'Fat must be a number greater than or equal to 0.';
  }

  return null;
};

export const useProducts = (): UseProductsState => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [updatingProductId, setUpdatingProductId] = useState<Product['id'] | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<Product['id'] | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const loadedProducts = await fetchProducts();
        if (!cancelled) {
          setProducts(loadedProducts);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load products');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const refreshProducts = async (): Promise<void> => {
    const loadedProducts = await fetchProducts();
    setProducts(loadedProducts);
  };

  const createProduct = async (input: ProductPayload): Promise<boolean> => {
    const normalizedInput: ProductPayload = {
      name: input.name.trim(),
      unit: input.unit.trim(),
      kcal: input.kcal,
      protein_g: input.protein_g,
      carbs_g: input.carbs_g,
      fat_g: input.fat_g,
    };
    const validationError = validateProductPayload(normalizedInput);
    if (validationError) {
      setActionError(validationError);
      return false;
    }

    try {
      setIsCreating(true);
      setActionError(null);

      await createProductRequest(normalizedInput);
      await refreshProducts();
      return true;
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to create product');
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  const updateProduct = async (
    id: Product['id'],
    input: ProductPayload,
  ): Promise<boolean> => {
    const normalizedInput: ProductPayload = {
      name: input.name.trim(),
      unit: input.unit.trim(),
      kcal: input.kcal,
      protein_g: input.protein_g,
      carbs_g: input.carbs_g,
      fat_g: input.fat_g,
    };
    const validationError = validateProductPayload(normalizedInput);
    if (validationError) {
      setActionError(validationError);
      return false;
    }

    try {
      setUpdatingProductId(id);
      setActionError(null);

      await updateProductRequest(id, normalizedInput);
      await refreshProducts();
      return true;
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to update product');
      return false;
    } finally {
      setUpdatingProductId(null);
    }
  };

  const deleteProduct = async (id: Product['id']): Promise<boolean> => {
    try {
      setDeletingProductId(id);
      setActionError(null);

      await deleteProductRequest(id);
      await refreshProducts();
      return true;
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to delete product');
      return false;
    } finally {
      setDeletingProductId(null);
    }
  };

  return {
    products,
    isLoading,
    error,
    isCreating,
    updatingProductId,
    deletingProductId,
    actionError,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
