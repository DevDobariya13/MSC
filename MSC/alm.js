import React, { useState, useEffect } from 'react';
import { Volume2, Brain, Mic, Database, Users, ChevronRight, Upload, Play, Pause, Shield, Building2, Ear, Radio, Plane, Github, Mail, Linkedin, Twitter } from 'lucide-react';

const WaveformBackground = () => {
  const [waves, setWaves] = useState([]);

  useEffect(() => {
    const generateWaves = () => {
      return Array.from({ length: 50 }, (_, i) => ({
        id: i,
        delay: i * 0.1,
        height: Math.random() * 100 + 20
      }));
    };
    setWaves(generateWaves());

    const interval = setInterval(() => {
      setWaves(generateWaves());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <div className="flex items-end justify-around h-full">
        {waves.map((wave) => (
          <div
            key={wave.id}
            className="w-1 bg-cyan-400 transition-all duration-1000 ease-in-out"
            style={{
              height: `${wave.height}%`,
              transitionDelay: `${wave.delay}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Navigation = ({ currentPage, setCurrentPage }) => {
  const navItems = ['Home', 'How It Works', 'Use Cases', 'Dataset', 'Demo', 'Team'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <Volume2 className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold text-white">ALM</span>
          </div>
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setCurrentPage(item.toLowerCase().replace(' ', '-'))}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.toLowerCase().replace(' ', '-')
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

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

const UseCasesPage = () => {
  const useCases = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'Defence & Surveillance',
      description: 'Detect threats, identify suspicious activities, and monitor security zones through intelligent audio analysis',
      examples: ['Gunshot detection', 'Crowd monitoring', 'Perimeter security']
    },
    {
      icon: <Radio className="w-12 h-12" />,
      title: 'Disaster Response',
      description: 'Locate survivors, assess damage, and coordinate rescue operations using audio intelligence',
      examples: ['Survivor detection', 'Emergency calls', 'Structural alerts']
    },
    {
      icon: <Building2 className="w-12 h-12" />,
      title: 'Smart Cities',
      description: 'Monitor urban environments, optimize traffic flow, and enhance public safety infrastructure',
      examples: ['Traffic analysis', 'Public safety', 'Noise pollution']
    },
    {
      icon: <Ear className="w-12 h-12" />,
      title: 'Accessibility',
      description: 'Empower visually impaired individuals with detailed audio scene descriptions and contextual awareness',
      examples: ['Scene description', 'Navigation aid', 'Alert system']
    },
    {
      icon: <Plane className="w-12 h-12" />,
      title: 'Transportation Safety',
      description: 'Enhance aviation and public transit safety through real-time audio monitoring and anomaly detection',
      examples: ['Airport monitoring', 'Railway safety', 'Vehicle diagnostics']
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Healthcare',
      description: 'Monitor patient conditions, detect distress signals, and assist in clinical documentation',
      examples: ['Patient monitoring', 'Fall detection', 'Clinical notes']
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-6 text-center">Real-World Applications</h1>
        <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
          ALM transforms industries by bringing human-level audio understanding to critical applications
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, idx) => (
            <div
              key={idx}
              className="p-8 bg-gray-800/50 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20 group"
            >
              <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                {useCase.icon}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">{useCase.title}</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">{useCase.description}</p>
              <div className="space-y-2">
                {useCase.examples.map((example, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                    <span className="text-sm text-gray-500">{example}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DatasetPage = () => {
  const languages = ['Hindi', 'Tamil', 'Mandarin', 'Urdu', 'Bangla', 'English'];
  const datasets = [
    { name: 'Speech Corpus', size: '10,000+ hours', description: 'Multilingual speech recordings across diverse accents and domains' },
    { name: 'Acoustic Events', size: '5,000+ classes', description: 'Environmental sounds, music, and acoustic scene recordings' },
    { name: 'OpenAQA Reasoning', size: '50,000+ QA pairs', description: 'Audio question-answering data for context reasoning' },
    { name: 'Mixed Audio Scenes', size: '25,000+ hours', description: 'Complex audio mixtures simulating real-world scenarios' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-6 text-center">Dataset & Research</h1>
        <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
          Built on comprehensive multilingual datasets and cutting-edge research methodologies
        </p>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Multilingual Support</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {languages.map((lang, idx) => (
              <div
                key={idx}
                className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/30 text-center hover:border-cyan-500/60 transition-all"
              >
                <span className="text-lg font-semibold text-white">{lang}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Training Data</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {datasets.map((dataset, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-800/50 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-white">{dataset.name}</h3>
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full">
                    {dataset.size}
                  </span>
                </div>
                <p className="text-gray-400">{dataset.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 border border-cyan-500/30">
          <h2 className="text-3xl font-bold text-white mb-6">Research Methodology</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Our approach combines state-of-the-art deep learning architectures with novel training strategies 
              to achieve joint understanding of speech and non-speech audio. We employ advanced audio mixing 
              techniques to create realistic training scenarios that mirror real-world complexity.
            </p>
            <p>
              The reasoning capabilities are developed through integration with datasets like OpenAQA, enabling 
              the model to answer complex questions about audio content and infer contextual information that 
              goes beyond simple classification or transcription.
            </p>
            <div className="flex gap-4 mt-6">
              <button className="px-6 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-all">
                Read Paper
              </button>
              <button className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all">
                Download Dataset Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DemoPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setResult({
        speech: "I'm boarding flight 302 to New York",
        events: ['airplane engine', 'crowd chatter', 'PA announcement', 'luggage wheels'],
        emotions: { tone: 'neutral', urgency: 'low', confidence: 0.89 },
        inference: 'Person is at an airport boarding gate preparing to board an international flight'
      });
      setIsProcessing(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-6 text-center">Interactive Demo</h1>
        <p className="text-xl text-gray-400 text-center mb-12">
          Experience ALM's capabilities by uploading audio or recording in real-time
        </p>

        <div className="bg-gray-800/50 rounded-xl border border-cyan-500/20 p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <button className="p-8 border-2 border-dashed border-cyan-500/30 rounded-xl hover:border-cyan-500/60 hover:bg-cyan-500/5 transition-all group">
              <Upload className="w-12 h-12 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-white font-semibold block">Upload Audio File</span>
              <span className="text-sm text-gray-400">MP3, WAV, M4A (Max 10MB)</span>
            </button>

            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`p-8 border-2 rounded-xl transition-all ${
                isRecording
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/5'
              }`}
            >
              {isRecording ? (
                <Pause className="w-12 h-12 text-red-400 mx-auto mb-3 animate-pulse" />
              ) : (
                <Mic className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
              )}
              <span className="text-white font-semibold block">
                {isRecording ? 'Stop Recording' : 'Record Audio'}
              </span>
              <span className="text-sm text-gray-400">Use your microphone</span>
            </button>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isProcessing}
            className="w-full py-4 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-all disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Analyzing Audio...' : 'Analyze Audio'}
          </button>
        </div>

        {isProcessing && (
          <div className="bg-gray-800/50 rounded-xl border border-cyan-500/20 p-8 mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <p className="text-center text-gray-400">Processing audio through neural networks...</p>
          </div>
        )}

        {result && !isProcessing && (
          <div className="bg-gray-800/50 rounded-xl border border-cyan-500/20 p-8 space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4">Analysis Results</h3>

            <div className="border-l-4 border-green-400 pl-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">DETECTED SPEECH</h4>
              <p className="text-lg text-white">"{result.speech}"</p>
            </div>

            <div className="border-l-4 border-blue-400 pl-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">DETECTED EVENTS</h4>
              <div className="flex flex-wrap gap-2">
                {result.events.map((event, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                  >
                    {event}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-l-4 border-purple-400 pl-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">EMOTION & TONE</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="text-sm text-gray-400">Tone:</span>
                  <span className="text-white ml-2">{result.emotions.tone}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Urgency:</span>
                  <span className="text-white ml-2">{result.emotions.urgency}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Confidence:</span>
                  <span className="text-white ml-2">{(result.emotions.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-cyan-400 pl-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">CONTEXTUAL INFERENCE</h4>
              <p className="text-lg text-cyan-300 font-semibold">{result.inference}</p>
            </div>
          </div>
        )}

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">Try Sample Audio</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {['Airport Scene', 'Traffic Junction', 'Restaurant'].map((sample, idx) => (
              <button
                key={idx}
                onClick={handleAnalyze}
                className="p-4 bg-gray-800/50 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-all text-left group"
              >
                <Play className="w-6 h-6 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-white font-semibold block">{sample}</span>
                <span className="text-sm text-gray-400">Click to analyze</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamPage = () => {
  const team = [
    { name: 'Dr. Sarah Chen', role: 'Principal Investigator', affiliation: 'MIT CSAIL', initials: 'SC' },
    { name: 'Prof. Rajesh Kumar', role: 'Co-Lead Researcher', affiliation: 'IIT Delhi', initials: 'RK' },
    { name: 'Dr. Emily Watson', role: 'ML Engineer', affiliation: 'Stanford AI Lab', initials: 'EW' },
    { name: 'Dr. Ahmed Hassan', role: 'Audio Processing Lead', affiliation: 'Carnegie Mellon', initials: 'AH' },
    { name: 'Maria Rodriguez', role: 'Data Scientist', affiliation: 'UC Berkeley', initials: 'MR' },
    { name: 'Dr. Li Wei', role: 'NLP Specialist', affiliation: 'Tsinghua University', initials: 'LW' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-6 text-center">Our Team</h1>
        <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
          A diverse group of researchers and engineers pushing the boundaries of audio AI
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="p-6 bg-gray-800/50 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">{member.initials}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
              <p className="text-cyan-400 text-sm mb-2">{member.role}</p>
              <p className="text-gray-500 text-sm">{member.affiliation}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 border border-cyan-500/30 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Us</h2>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Interested in collaborating or joining our research team? We're building the next generation 
            of audio reasoning AI and would love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-all flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Contact Us
            </button>
            <button className="px-8 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all flex items-center justify-center gap-2">
              <Github className="w-5 h-5" />
              View on GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-cyan-500/20 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Volume2 className="w-6 h-6 text-cyan-400" />
              <span className="text-xl font-bold text-white">ALM</span>
            </div>
            <p className="text-gray-400 text-sm">
              Understanding the Sound Beyond Words
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Research</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Publications</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Datasets</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Code</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Documentation</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">API</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Blog</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 Audio Language Model Research Project. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'use-cases':
        return <UseCasesPage />;
      case 'dataset':
        return <DatasetPage />;
      case 'demo':
        return <DemoPage />;
      case 'team':
        return <TeamPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer />
    </div>
  );
}