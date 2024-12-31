export const API_ENDPOINTS = {
  GENERATE_RESPONSE: '/api/generate-response'
} as const;

export const ERROR_MESSAGES = {
  EMPTY_RESPONSE: 'No response received from server. Please try again.',
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  API_ERROR: 'API error occurred. Please try again later.',
} as const;