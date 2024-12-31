import { HandlerEvent } from '@netlify/functions';
import OpenAI from 'openai';
import { sendResponse } from '../utils';
import { validateEnvironment, validateRequest } from './validation';
import { SYSTEM_PROMPT } from './prompts';

export async function handleGenerateResponse(event: HandlerEvent) {
  try {
    // Validate environment and API key
    const envError = validateEnvironment();
    if (envError) return envError;

    // Parse and validate request
    const body = JSON.parse(event.body || '{}');
    console.log('Request body:', JSON.stringify(body, null, 2));

    const validationError = validateRequest(body);
    if (validationError) return validationError;

    const { resolution } = body;

    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!.trim()
    });

    console.log('Initiating OpenAI API call...');

    // Generate response
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `My New Year's resolution is: ${resolution}` }
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
}