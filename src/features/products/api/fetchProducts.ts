import { API_BASE_URL } from '../../../app/config/env.ts';
import type { ApiProduct, Product } from '../types.ts';

const normalizeProduct = (product: ApiProduct): Product => ({
  id: product.id ?? product._id ?? crypto.randomUUID(),
  name: product.name ?? product.title ?? 'Untitled product',
  slug: product.slug ?? '',
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
