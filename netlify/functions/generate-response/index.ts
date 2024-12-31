import { Handler } from '@netlify/functions';
import { handleGenerateResponse } from './handler';
import { sendResponse, HEADERS } from '../utils';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: HEADERS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return sendResponse(405, { 
      error: 'Method not allowed',
      debug: `Received method: ${event.httpMethod}`
    });
  }

  return handleGenerateResponse(event);
};