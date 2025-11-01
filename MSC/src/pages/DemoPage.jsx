import React, { useState, useRef } from 'react';
import { Upload, Play, Pause, Mic, AlertCircle, MapPin, ShieldAlert } from 'lucide-react';
import { analyzeAudio, analyzeSampleAudio } from '../services/audioService';
import AudioVisualizer from '../components/AudioVisualizer';
import { getCurrentLocation } from '../services/locationService';
import { sendSOSAlert } from '../services/sosService';

const DemoPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [error, setError] = useState(null);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [location, setLocation] = useState(null);
  const [autoSOS, setAutoSOS] = useState(true);
  const [sendingSOS, setSendingSOS] = useState(false);
  const [sosResult, setSOSResult] = useState(null);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    const validTypes = ['audio/mp3', 'audio/wav', 'audio/mpeg', 'audio/m4a'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid audio file (MP3, WAV, M4A)');
      return;
    }
    
    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit');
      return;
    }
    
    setAudioFile(file);
    setError(null);
    setResult(null);
  };

  // Handle recording
  const startRecording = async () => {
    try {
      setError(null);
      // Capture location early when user starts recording
      try {
        const loc = await getCurrentLocation();
        setLocation(loc);
      } catch (locErr) {
        // Location might be denied or unavailable; continue recording
        console.warn('Location unavailable:', locErr?.message || locErr);
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioFile = new File([audioBlob], "recorded-audio.wav", { type: 'audio/wav' });
        setRecordedAudio(audioFile);
        setAudioFile(audioFile);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setError('Could not access microphone. Please check permissions.');
      setIsRecording(false);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const detectEmergency = (analysis) => {
    if (!analysis) return { isEmergency: false, reasons: [] };
    const reasons = [];
    const speech = (analysis.speech || '').toLowerCase();
    const emergencyKeywords = ['help', 'fire', 'attack', 'accident', 'medical', 'police', 'ambulance', 'sos', 'danger'];
    if (emergencyKeywords.some(k => speech.includes(k))) {
      reasons.push('Emergency keywords detected in speech');
    }
    const events = Array.isArray(analysis.events) ? analysis.events.map(e => e.toLowerCase()) : [];
    const emergencyEvents = ['gunshot', 'explosion', 'scream', 'glass breaking', 'alarm'];
    if (events.some(e => emergencyEvents.includes(e))) {
      reasons.push('Emergency-related events detected');
    }
    if (analysis.emotions?.urgency === 'high') {
      reasons.push('High urgency emotion detected');
    }
    return { isEmergency: reasons.length > 0, reasons };
  };

  const handleAnalyze = async () => {
    if (!audioFile && !recordedAudio) {
      setError('Please upload or record audio first');
      return;
    }
    
    setError(null);
    setIsProcessing(true);
    
    try {
      // Use our audio service to analyze the file
      const analysisResult = await analyzeAudio(audioFile);
      setResult(analysisResult);

      // Auto-SOS if emergency detected
      const { isEmergency, reasons } = detectEmergency(analysisResult);
      if (isEmergency && autoSOS) {
        if (!location) {
          // Try to get location if not already captured
          try {
            const loc = await getCurrentLocation();
            setLocation(loc);
          } catch (locErr) {
            console.warn('Location unavailable at SOS time:', locErr?.message || locErr);
          }
        }
        setSendingSOS(true);
        try {
          const resp = await sendSOSAlert({ location, audioFile, analysis: analysisResult, reasons });
          setSOSResult(resp);
        } catch (sosErr) {
          setError('Failed to send SOS alert: ' + sosErr.message);
        } finally {
          setSendingSOS(false);
        }
      }
    } catch (err) {
      setError('Error analyzing audio: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleSampleAudio = async (sampleId) => {
    setError(null);
    setIsProcessing(true);
    setAudioFile(null);
    
    try {
      // Use our audio service to analyze the sample
      const analysisResult = await analyzeSampleAudio(sampleId);
      setResult(analysisResult);
    } catch (err) {
      setError('Error analyzing sample audio: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-6 text-center">Interactive Demo</h1>
        <p className="text-xl text-gray-400 text-center mb-12">
          Experience ALM's capabilities by uploading audio or recording in real-time
        </p>

        <div className="bg-gray-800/50 rounded-xl border border-cyan-500/20 p-8 mb-8">
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/40 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {/* Location & SOS controls */}
          <div className="mb-6 grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-900/40 border border-cyan-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-white font-semibold mb-2">
                <MapPin className="w-5 h-5 text-cyan-400" />
                Location
              </div>
              {location ? (
                <div className="text-sm text-gray-300">
                  <div>Lat: {location.latitude.toFixed(5)}</div>
                  <div>Lng: {location.longitude.toFixed(5)}</div>
                  <div className="text-gray-400">Accuracy: ±{Math.round(location.accuracy)}m</div>
                </div>
              ) : (
                <button
                  onClick={async () => {
                    try {
                      const loc = await getCurrentLocation();
                      setLocation(loc);
                    } catch (e) {
                      setError('Unable to get location: ' + e.message);
                    }
                  }}
                  className="px-3 py-2 bg-cyan-600 text-white rounded-md text-sm hover:bg-cyan-700"
                >
                  Get Location
                </button>
              )}
            </div>
            <div className="p-4 bg-gray-900/40 border border-cyan-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-white font-semibold mb-2">
                <ShieldAlert className="w-5 h-5 text-red-400" />
                Auto SOS
              </div>
              <label className="inline-flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={autoSOS}
                  onChange={(e) => setAutoSOS(e.target.checked)}
                  className="accent-cyan-500"
                />
                Enable automatic SOS on emergency detection
              </label>
            </div>
            <div className="p-4 bg-gray-900/40 border border-cyan-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-white font-semibold mb-2">
                <ShieldAlert className="w-5 h-5 text-cyan-400" />
                Manual SOS
              </div>
              <button
                disabled={!location || sendingSOS}
                onClick={async () => {
                  if (!result) { setError('Analyze audio first to send SOS'); return; }
                  setSendingSOS(true);
                  try {
                    const { isEmergency, reasons } = detectEmergency(result);
                    const resp = await sendSOSAlert({ location, audioFile, analysis: result, reasons: isEmergency ? reasons : ['Manual SOS triggered'] });
                    setSOSResult(resp);
                  } catch (e) {
                    setError('Failed to send SOS alert: ' + e.message);
                  } finally {
                    setSendingSOS(false);
                  }
                }}
                className="px-3 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed"
              >
                {sendingSOS ? 'Sending SOS...' : 'Send SOS Now'}
              </button>
              {!location && (
                <p className="mt-2 text-xs text-gray-400">Location required to send SOS.</p>
              )}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div 
              onClick={() => fileInputRef.current.click()}
              className={`p-8 border-2 border-dashed rounded-xl transition-all cursor-pointer ${
                audioFile && !isRecording ? 'border-green-500/50 bg-green-500/10' : 'border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/5'
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept=".mp3,.wav,.m4a,audio/*" 
                className="hidden" 
              />
              <Upload className="w-12 h-12 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-white font-semibold block text-center">
                {audioFile && !isRecording ? 'File Selected' : 'Upload Audio File'}
              </span>
              <span className="text-sm text-gray-400 block text-center">
                {audioFile && !isRecording ? audioFile.name : 'MP3, WAV, M4A (Max 10MB)'}
              </span>
            </div>

            <button
              onClick={toggleRecording}
              className={`p-8 border-2 rounded-xl transition-all ${
                isRecording
                  ? 'border-red-500 bg-red-500/10'
                  : recordedAudio 
                    ? 'border-green-500/50 bg-green-500/10'
                    : 'border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/5'
              }`}
            >
              {isRecording ? (
                <Pause className="w-12 h-12 text-red-400 mx-auto mb-3 animate-pulse" />
              ) : (
                <Mic className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
              )}
              <span className="text-white font-semibold block text-center">
                {isRecording ? 'Stop Recording' : recordedAudio ? 'Recording Saved' : 'Record Audio'}
              </span>
              <span className="text-sm text-gray-400 text-center block">
                {isRecording ? 'Recording in progress...' : 'Use your microphone'}
              </span>
            </button>
          </div>

          {audioFile && (
            <div className="mb-6">
              <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg mb-4">
                <h4 className="text-white font-semibold mb-2">Selected Audio:</h4>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-300">{audioFile.name}</span>
                  <span className="text-gray-400 text-sm">{(audioFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                </div>
              </div>
              <AudioVisualizer audioFile={audioFile} />
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={isProcessing || (!audioFile && !recordedAudio)}
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

            {sosResult && (
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">SOS STATUS</h4>
                <p className="text-sm text-gray-300">Alert {sosResult.status} • Ref: <span className="text-white">{sosResult.referenceId}</span></p>
                {location && (
                  <p className="text-xs text-gray-400 mt-1">Sent from ({location.latitude.toFixed(5)}, {location.longitude.toFixed(5)})</p>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">Try Sample Audio</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'Airport Scene', id: 'airport' },
              { name: 'Traffic Junction', id: 'traffic' },
              { name: 'Restaurant', id: 'restaurant' }
            ].map((sample) => (
              <button
                key={sample.id}
                onClick={() => handleSampleAudio(sample.id)}
                className="p-4 bg-gray-800/50 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-all text-left group"
              >
                <Play className="w-6 h-6 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-white font-semibold block">{sample.name}</span>
                <span className="text-sm text-gray-400">Click to analyze</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;