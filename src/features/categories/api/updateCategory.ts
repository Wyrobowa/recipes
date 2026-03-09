import { API_BASE_URL } from '../../../app/config/env.ts';
import { throwIfResponseNotOk } from '../../shared/api/responseHelpers.ts';

export const updateCategory = async (id: string | number, name: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/category/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  await throwIfResponseNotOk(response, 'update category');
};
