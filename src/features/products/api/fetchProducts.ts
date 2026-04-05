import { API_BASE_URL } from '../../../app/config/env.ts';
import { getApiDataArray, throwIfResponseNotOk } from '../../shared/api/responseHelpers.ts';
import type { ApiProduct, Product } from '../types.ts';

const toNumber = (value: number | string | undefined): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const normalizeProduct = (product: ApiProduct): Product => {
  const rawId = product.id ?? product._id;
  if (rawId == null) {
    console.warn('Product missing id, using generated UUID', product);
  }
  return {
    id: rawId != null ? String(rawId) : crypto.randomUUID(),
    name: product.name ?? product.title ?? 'Untitled product',
    unit: product.unit ?? '',
    kcal: toNumber(product.kcal),
    protein_g: toNumber(product.protein_g),
    carbs_g: toNumber(product.carbs_g),
    fat_g: toNumber(product.fat_g),
  };
};

export const fetchProducts = async (signal?: AbortSignal): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products`, { signal });
  await throwIfResponseNotOk(response, 'fetch products');

  const payload: unknown = await response.json();
  const data = getApiDataArray(payload);

  if (!data) {
    throw new Error('Invalid products response');
  }

  return data.map((item) => normalizeProduct(item as ApiProduct));
};
