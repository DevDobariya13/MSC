import React, { useEffect, useRef } from 'react';

const AudioVisualizer = ({ audioFile }) => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const animationRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  useEffect(() => {
    if (!audioFile) return;

    // Create audio element and set source
    const audioElement = audioRef.current;
    const objectURL = URL.createObjectURL(audioFile);
    audioElement.src = objectURL;

    // Set up audio context and analyzer
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContextRef.current = audioContext;
    
    const analyser = audioContext.createAnalyser();
    analyserRef.current = analyser;
    analyser.fftSize = 256;
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    dataArrayRef.current = dataArray;

    // Connect audio to analyzer
    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    // Start visualization
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    
    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      
      analyser.getByteFrequencyData(dataArray);
      
      canvasCtx.fillStyle = 'rgb(20, 20, 30)';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
      
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;
      
      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;
        
        const r = 0;
        const g = 200 + (barHeight / 2);
        const b = 255;
        
        canvasCtx.fillStyle = `rgb(${r},${g},${b})`;
        canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        
        x += barWidth + 1;
      }
    };
    
    draw();
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      URL.revokeObjectURL(objectURL);
    };
  }, [audioFile]);

  return (
    <div className="w-full rounded-lg overflow-hidden bg-gray-900/50 border border-cyan-500/20">
      <canvas ref={canvasRef} className="w-full h-24"></canvas>
      <audio ref={audioRef} className="w-full h-10 mt-2" controls></audio>
    </div>
  );
};

export default AudioVisualizer;