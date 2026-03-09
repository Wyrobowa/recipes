const asNonEmptyString = (value: unknown): string | null => {
  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim();
  return normalized ? normalized : null;
};

export const extractApiErrorMessage = (payload: unknown): string | null => {
  if (typeof payload !== 'object' || payload === null) {
    return null;
  }

  const fromMessage = asNonEmptyString((payload as { message?: unknown }).message);
  if (fromMessage) {
    return fromMessage;
  }

  const error = (payload as { error?: unknown }).error;

  const fromErrorString = asNonEmptyString(error);
  if (fromErrorString) {
    return fromErrorString;
  }

  if (typeof error === 'object' && error !== null) {
    const fromNestedError = asNonEmptyString((error as { message?: unknown }).message);
    if (fromNestedError) {
      return fromNestedError;
    }
  }

  return null;
};

export const throwIfResponseNotOk = async (
  response: Response,
  fallbackAction: string
): Promise<void> => {
  if (response.ok) {
    return;
  }

  let errorMessage = `Failed to ${fallbackAction} (${response.status})`;

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
};

export const getApiDataArray = (payload: unknown): unknown[] | null => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (
    typeof payload === 'object' &&
    payload !== null &&
    'data' in payload &&
    Array.isArray((payload as { data: unknown }).data)
  ) {
    return (payload as { data: unknown[] }).data;
  }

  return null;
};
