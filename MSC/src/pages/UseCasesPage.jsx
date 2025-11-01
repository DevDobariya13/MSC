import React from 'react';
import { Shield, Radio, Building2, Ear, Plane, Users } from 'lucide-react';

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

export default UseCasesPage;