import { makeApiRequest } from './api';
import { ApiResponse } from './types';
import { API_ENDPOINTS } from './config';

export const generateFailureReason = async (resolution: string): Promise<string> => {
  try {
    console.log('Generating response for resolution:', resolution);
    
    const data = await makeApiRequest<ApiResponse>(
      API_ENDPOINTS.GENERATE_RESPONSE,
      { resolution }
    );

    if (!data.response) {
      throw new Error(data.error || 'Invalid response format from server');
    }

    return data.response;
  } catch (error: any) {
    console.error('Error in generateFailureReason:', error);
    return `${error.message} Please ensure the OpenAI API key is configured correctly.`;
  }
};