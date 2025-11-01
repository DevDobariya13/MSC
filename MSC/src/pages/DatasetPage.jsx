import React from 'react';

const DatasetPage = () => {
  const languages = ['Hindi', 'Tamil', 'Telugu', 'English'];
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
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">Research Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <a 
                  href="/documents/research_methodology.pdf" 
                  download
                  className="flex items-center p-4 bg-gray-700/50 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 hover:bg-gray-700/80 transition-all"
                >
                  <div className="mr-3 text-cyan-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-white">Research Methodology</div>
                    <div className="text-sm text-gray-400">PDF • 245 KB</div>
                  </div>
                </a>
                
                <a 
                  href="/documents/data_collection_protocol.pdf" 
                  download
                  className="flex items-center p-4 bg-gray-700/50 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 hover:bg-gray-700/80 transition-all"
                >
                  <div className="mr-3 text-cyan-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-white">Data Collection Protocol</div>
                    <div className="text-sm text-gray-400">PDF • 267 KB</div>
                  </div>
                </a>
                
                <a 
                  href="/documents/model_evaluation_framework.pdf" 
                  download
                  className="flex items-center p-4 bg-gray-700/50 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 hover:bg-gray-700/80 transition-all"
                >
                  <div className="mr-3 text-cyan-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-white">Model Evaluation Framework</div>
                    <div className="text-sm text-gray-400">PDF • 230 KB</div>
                  </div>
                </a>
              </div>
            </div>
            
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

export default DatasetPage;