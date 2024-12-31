import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { generateFailureReason } from '../lib/openai';

export function ResolutionForm() {
  const [resolution, setResolution] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolution.trim()) return;

    setLoading(true);
    const failureReason = await generateFailureReason(resolution);
    setResponse(failureReason);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            placeholder="Enter your doomed New Year's resolution..."
            className="w-full p-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all min-h-[120px]"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !resolution.trim()}
            className="absolute bottom-4 right-4 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center text-gray-500 animate-pulse">
          Calculating your inevitable failure...
        </div>
      )}

      {response && !loading && (
        <div className="bg-black/90 text-white p-6 rounded-lg shadow-xl">
          <p className="text-lg font-medium italic">{response}</p>
        </div>
      )}
    </div>
  );
}