import { API_BASE_URL } from '../../../app/config/env.ts';
import { extractApiErrorMessage } from './extractApiErrorMessage.ts';

export const deleteRecipe = async (slug: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/recipe/${slug}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    let errorMessage = `Failed to delete recipe (${response.status})`;

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
