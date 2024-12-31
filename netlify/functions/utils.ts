import { HandlerResponse } from '@netlify/functions';

export const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
} as const;

export const sendResponse = (
  statusCode: number,
  body: Record<string, any>
): HandlerResponse => ({
  statusCode,
  headers: HEADERS,
  body: JSON.stringify(body)
});