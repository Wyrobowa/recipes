import { API_BASE_URL } from '../../../app/config/env.ts';
import type { RecipePayload } from '../types.ts';
import { extractApiErrorMessage } from './extractApiErrorMessage.ts';

export const updateRecipe = async (slug: string, input: RecipePayload): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/recipe/edit/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    let errorMessage = `Failed to update recipe (${response.status})`;

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
