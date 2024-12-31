import { sendResponse } from '../utils';

export function validateEnvironment() {
  console.log('API Key Status:', {
    exists: !!process.env.OPENAI_API_KEY,
    keyPrefix: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 3) : 'none',
    envVarsAvailable: Object.keys(process.env).length
  });

  if (!process.env.OPENAI_API_KEY) {
    console.error('OpenAI API key missing from environment');
    return sendResponse(500, { 
      error: 'OpenAI API key is not configured',
      debug: 'Missing required environment variable: OPENAI_API_KEY'
    });
  }

  return null;
}

export function validateRequest(body: any) {
  const { resolution } = body;

  if (!resolution) {
    return sendResponse(400, { error: 'Resolution is required' });
  }

  return null;
}