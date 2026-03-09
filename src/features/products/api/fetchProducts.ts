import { API_BASE_URL } from '../../../app/config/env.ts';
import type { ApiProduct, Product } from '../types.ts';

const toNumber = (value: number | string | undefined): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const normalizeProduct = (product: ApiProduct): Product => ({
  id: product.id ?? product._id ?? crypto.randomUUID(),
  name: product.name ?? product.title ?? 'Untitled product',
  unit: product.unit ?? '',
  protein_g: toNumber(product.protein_g),
  carbs_g: toNumber(product.carbs_g),
  fat_g: toNumber(product.fat_g),
});

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products (${response.status})`);
  }

  const payload: unknown = await response.json();
  const data = Array.isArray(payload)
    ? payload
    : typeof payload === 'object' &&
        payload !== null &&
        'data' in payload &&
        Array.isArray((payload as { data: unknown }).data)
      ? (payload as { data: unknown[] }).data
      : null;

  if (!data) {
    throw new Error('Invalid products response');
  }

  return data.map((item) => normalizeProduct(item as ApiProduct));
};
