import React from 'react';
import { Volume2, Brain, Mic, Plane, ChevronRight } from 'lucide-react';
import WaveformBackground from '../components/WaveformBackground';

const HomePage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <WaveformBackground />
      
      <div className="relative pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
            <span className="text-cyan-400 text-sm font-medium">Next-Generation Audio AI</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Audio Language Model
          </h1>
          
          <p className="text-3xl text-cyan-400 mb-8 font-light">
            Understanding the Sound Beyond Words
          </p>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            A next-generation deep learning system that jointly understands speech and non-speech audio, 
            reasons about real-world sound scenes, and infers context like a human listener.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('demo')}
              className="px-8 py-4 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/50 flex items-center justify-center gap-2"
            >
              Try Demo <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPage('how-it-works')}
              className="px-8 py-4 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all border border-cyan-500/30"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Volume2 className="w-8 h-8" />,
                title: 'Joint Understanding',
                description: 'Simultaneously processes speech and non-speech audio for comprehensive scene understanding'
              },
              {
                icon: <Brain className="w-8 h-8" />,
                title: 'Context Reasoning',
                description: 'Infers real-world context by analyzing multiple audio cues and their relationships'
              },
              {
                icon: <Mic className="w-8 h-8" />,
                title: 'Multilingual Support',
                description: 'Trained on diverse languages including Hindi, Tamil, Mandarin, Urdu, Bangla, and English'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-8 bg-gray-800/50 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20 backdrop-blur-sm"
              >
                <div className="text-cyan-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">See It In Action</h2>
          <div className="bg-gray-900/80 border border-cyan-500/30 rounded-xl p-8 shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <Plane className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Airport Scenario</h3>
                <p className="text-gray-400 mb-4">
                  From an airport audio recording, ALM recognizes announcements, airplane sounds, 
                  and crowd noise to infer that a person is near a boarding gate.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Detected speech: "Flight 302 now boarding"</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">Detected events: airplane engine, crowd chatter, PA system</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-gray-300 font-semibold">Inference: Person is at airport boarding area</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;