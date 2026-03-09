import { API_BASE_URL } from '../../../app/config/env.ts';
import { getApiDataArray, throwIfResponseNotOk } from '../../shared/api/responseHelpers.ts';
import type { ApiCategory, Category } from '../types.ts';

const normalizeCategory = (category: ApiCategory): Category => ({
  id: category.id ?? category._id ?? crypto.randomUUID(),
  name: category.name ?? category.title ?? 'Untitled category',
  slug: category.slug ?? '',
});

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  await throwIfResponseNotOk(response, 'fetch categories');

  const payload: unknown = await response.json();
  const data = getApiDataArray(payload);

  if (!data) {
    throw new Error('Invalid categories response');
  }

  return data.map((item) => normalizeCategory(item as ApiCategory));
};
