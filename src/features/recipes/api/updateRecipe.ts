import { API_BASE_URL } from '../../../app/config/env.ts';
import { throwIfResponseNotOk } from '../../shared/api/responseHelpers.ts';
import type { RecipePayload } from '../types.ts';

export const updateRecipe = async (slug: string, input: RecipePayload): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/recipe/edit/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  await throwIfResponseNotOk(response, 'update recipe');
};
