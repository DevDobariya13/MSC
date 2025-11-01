import React, { useState, useEffect } from 'react';

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

export default WaveformBackground;