import { API_BASE_URL } from '../../../app/config/env.ts';
import { throwIfResponseNotOk } from '../../shared/api/responseHelpers.ts';

export const deleteCategory = async (id: string | number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/category/${id}`, {
    method: 'DELETE',
  });
  await throwIfResponseNotOk(response, 'delete category');
};
