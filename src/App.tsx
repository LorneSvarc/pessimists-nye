import React from 'react';
import { Sparkles } from 'lucide-react';
import { ResolutionForm } from './components/ResolutionForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Sparkles size={48} className="text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The Pessimist's New Year's Eve
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Share your New Year's resolution and find out if this is the year you'll actually reach your goals!
          </p>
        </div>
        
        <ResolutionForm />
        
        <footer className="text-center mt-16 text-gray-400 text-sm">
          <p>Crushing dreams and expectations since 2024</p>
        </footer>
      </div>
    </div>
  );
}

export default App;