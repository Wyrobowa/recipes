import { API_BASE_URL } from '../../../app/config/env.ts';
import type { ApiCategory, Category } from '../types.ts';

const normalizeCategory = (category: ApiCategory): Category => ({
  id: category.id ?? category._id ?? crypto.randomUUID(),
  name: category.name ?? category.title ?? 'Untitled category',
  slug: category.slug ?? '',
});

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE_URL}/categories`);

  if (!response.ok) {
    throw new Error(`Failed to fetch categories (${response.status})`);
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
    throw new Error('Invalid categories response');
  }

  return data.map((item) => normalizeCategory(item as ApiCategory));
};
