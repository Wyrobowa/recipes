import { API_BASE_URL } from '../../../app/config/env.ts';
import { getApiDataArray, throwIfResponseNotOk } from '../../shared/api/responseHelpers.ts';
import type { ApiProduct, Product } from '../types.ts';

const toNumber = (value: number | string | undefined): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const normalizeProduct = (product: ApiProduct): Product => ({
  id: product.id ?? product._id ?? crypto.randomUUID(),
  name: product.name ?? product.title ?? 'Untitled product',
  unit: product.unit ?? '',
  kcal: toNumber(product.kcal),
  protein_g: toNumber(product.protein_g),
  carbs_g: toNumber(product.carbs_g),
  fat_g: toNumber(product.fat_g),
});

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products`);
  await throwIfResponseNotOk(response, 'fetch products');

  const payload: unknown = await response.json();
  const data = getApiDataArray(payload);

  if (!data) {
    throw new Error('Invalid products response');
  }

  return data.map((item) => normalizeProduct(item as ApiProduct));
};
