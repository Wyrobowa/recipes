import { API_BASE_URL } from '../../../app/config/env.ts';
import type { ProductPayload } from '../types.ts';
import { extractApiErrorMessage } from './extractApiErrorMessage.ts';

export const createProduct = async (input: ProductPayload): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/product`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    let errorMessage = `Failed to create product (${response.status})`;

    try {
      const payload: unknown = await response.json();
      const apiMessage = extractApiErrorMessage(payload);
      if (apiMessage) {
        errorMessage = apiMessage;
      }
    } catch {
      // Ignore JSON parse errors and keep fallback message.
    }

    throw new Error(errorMessage);
  }
};
