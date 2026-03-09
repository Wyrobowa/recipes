export const extractApiErrorMessage = (payload: unknown): string | null => {
  if (typeof payload !== 'object' || payload === null) {
    return null;
  }

  if ('message' in payload && typeof payload.message === 'string' && payload.message.trim()) {
    return payload.message;
  }

  if ('error' in payload && typeof payload.error === 'string' && payload.error.trim()) {
    return payload.error;
  }

  return null;
};
