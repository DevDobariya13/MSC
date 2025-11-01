import React from 'react';
import { Mic, Volume2, Brain, Radio, ChevronRight } from 'lucide-react';

const HowItWorksPage = () => {
  const components = [
    {
      icon: <Mic className="w-12 h-12" />,
      title: 'Speech Recognition',
      description: 'Advanced automatic speech recognition that transcribes spoken words across multiple languages with high accuracy'
    },
    {
      icon: <Volume2 className="w-12 h-12" />,
      title: 'Non-Speech Detection',
      description: 'Identifies and classifies environmental sounds, music, and acoustic events in complex audio scenes'
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: 'Emotion & Tone Analysis',
      description: 'Analyzes prosody, sentiment, and emotional content from voice characteristics and speech patterns'
    },
    {
      icon: <Radio className="w-12 h-12" />,
      title: 'Reasoning Engine',
      description: 'Integrates multiple audio cues to infer context, location, and situational awareness like human cognition'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-6 text-center">How It Works</h1>
        <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
          ALM employs a sophisticated multi-stage architecture that processes audio through specialized components working in harmony
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {components.map((component, idx) => (
            <div
              key={idx}
              className="p-8 bg-gray-800/50 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <div className="text-cyan-400 mb-4">{component.icon}</div>
              <h3 className="text-2xl font-semibold text-white mb-3">{component.title}</h3>
              <p className="text-gray-400 leading-relaxed">{component.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 border border-cyan-500/30">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Processing Pipeline</h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {['Audio Input', 'Feature Extraction', 'Multi-Modal Analysis', 'Reasoning', 'Context Output'].map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-cyan-500/10 border-2 border-cyan-500 flex items-center justify-center mb-2">
                    <span className="text-cyan-400 font-bold text-lg">{idx + 1}</span>
                  </div>
                  <span className="text-gray-300 text-sm text-center">{step}</span>
                </div>
                {idx < 4 && (
                  <ChevronRight className="hidden md:block w-6 h-6 text-cyan-400" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;