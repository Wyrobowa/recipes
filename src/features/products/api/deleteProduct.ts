import { API_BASE_URL } from '../../../app/config/env.ts';
import { throwIfResponseNotOk } from '../../shared/api/responseHelpers.ts';

export const deleteProduct = async (id: string | number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/product/${id}`, {
    method: 'DELETE',
  });
  await throwIfResponseNotOk(response, 'delete product');
};
