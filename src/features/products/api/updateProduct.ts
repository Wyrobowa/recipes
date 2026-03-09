import { API_BASE_URL } from '../../../app/config/env.ts';
import { throwIfResponseNotOk } from '../../shared/api/responseHelpers.ts';
import type { ProductPayload } from '../types.ts';

export const updateProduct = async (id: string | number, input: ProductPayload): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/product/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  await throwIfResponseNotOk(response, 'update product');
};
