import { ApiResponse, ResolutionRequest } from './types';
import { API_ENDPOINTS, ERROR_MESSAGES } from './config';

export async function makeApiRequest<T>(
  endpoint: string,
  data: ResolutionRequest
): Promise<T> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const text = await response.text();
    if (!text) {
      throw new Error(ERROR_MESSAGES.EMPTY_RESPONSE);
    }

    let jsonData: ApiResponse;
    try {
      jsonData = JSON.parse(text);
    } catch (e) {
      console.error('JSON Parse Error:', e, 'Response:', text);
      throw new Error(ERROR_MESSAGES.API_ERROR);
    }

    if (!response.ok) {
      throw new Error(jsonData.error || `Server error: ${response.status}`);
    }

    return jsonData as T;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
  }
}