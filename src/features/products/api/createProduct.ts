import { API_BASE_URL } from '../../../app/config/env.ts';
import { throwIfResponseNotOk } from '../../shared/api/responseHelpers.ts';
import type { ProductPayload } from '../types.ts';

export const createProduct = async (input: ProductPayload): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/product`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  await throwIfResponseNotOk(response, 'create product');
};
