import { API_BASE_URL } from '../../../app/config/env.ts';
import { throwIfResponseNotOk } from '../../shared/api/responseHelpers.ts';

export const createCategory = async (name: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/category`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  await throwIfResponseNotOk(response, 'create category');
};
