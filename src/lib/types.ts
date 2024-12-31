export interface ApiResponse {
  response?: string;
  error?: string;
  details?: string;
  debug?: string;
}

export interface ResolutionRequest {
  resolution: string;
}