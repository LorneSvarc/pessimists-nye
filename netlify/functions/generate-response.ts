import { Handler } from '@netlify/functions';
import OpenAI from 'openai';
import { sendResponse, HEADERS } from './utils';

export const handler: Handler = async (event) => {
  // Enhanced environment debugging
  console.log('API Key Status:', {
    exists: !!process.env.OPENAI_API_KEY,
    keyPrefix: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 3) : 'none',
    envVarsAvailable: Object.keys(process.env).length
  });

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: HEADERS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return sendResponse(405, { 
      error: 'Method not allowed',
      debug: `Received method: ${event.httpMethod}`
    });
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error('OpenAI API key missing from environment');
    return sendResponse(500, { 
      error: 'OpenAI API key is not configured',
      debug: 'Missing required environment variable: OPENAI_API_KEY'
    });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    console.log('Request body:', JSON.stringify(body, null, 2));

    const { resolution } = body;

    if (!resolution) {
      return sendResponse(400, { error: 'Resolution is required' });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY.trim()
    });

    console.log('Initiating OpenAI API call...');

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a darkly humorous, sardonic critic who specializes in predicting why people's New Year's resolutions will fail. Your responses should be witty, clever, and amusing while pointing out human nature's flaws and society's absurdities. Keep responses concise (2-3 sentences) and entertainingly pessimistic."
        },
        {
          role: "user",
          content: `My New Year's resolution is: ${resolution}`
        }
      ],
      model: "gpt-3.5-turbo",
    });

    console.log('OpenAI API response received:', {
      status: 'success',
      hasChoices: !!completion.choices?.length
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      return sendResponse(500, { 
        error: 'No response generated',
        debug: 'OpenAI response was empty or invalid'
      });
    }

    return sendResponse(200, { response });
  } catch (error: any) {
    console.error('Function error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      raw: JSON.stringify(error, null, 2)
    });

    return sendResponse(500, { 
      error: 'Failed to generate response',
      details: error.message,
      debug: error.stack
    });
  }
};