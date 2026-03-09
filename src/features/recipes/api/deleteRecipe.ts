import { API_BASE_URL } from '../../../app/config/env.ts';
import { throwIfResponseNotOk } from '../../shared/api/responseHelpers.ts';

export const deleteRecipe = async (slug: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/recipe/${slug}`, {
    method: 'DELETE',
  });
  await throwIfResponseNotOk(response, 'delete recipe');
};
