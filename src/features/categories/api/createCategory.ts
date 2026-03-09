import { API_BASE_URL } from '../../../app/config/env.ts';
import { extractApiErrorMessage } from './extractApiErrorMessage.ts';

export const createCategory = async (name: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/category`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    let errorMessage = `Failed to create category (${response.status})`;

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
