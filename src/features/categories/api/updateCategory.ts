import { API_BASE_URL } from '../../../app/config/env.ts';
import { extractApiErrorMessage } from './extractApiErrorMessage.ts';

export const updateCategory = async (id: string | number, name: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/category/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    let errorMessage = `Failed to update category (${response.status})`;

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
