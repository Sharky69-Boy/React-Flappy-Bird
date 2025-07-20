
import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white z-10 text-center p-4">
      <h1 className="text-6xl font-bold" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.5)' }}>
        React Flappy Bird
      </h1>
      <p className="mt-4 text-xl" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        Click or Press Space to Start
      </p>
      <button
        onClick={onStart}
        className="mt-8 px-8 py-4 bg-yellow-400 text-black font-bold text-2xl rounded-lg shadow-lg hover:bg-yellow-500 transition-all transform hover:scale-105"
      >
        Play
      </button>
    </div>
  );
};

export default StartScreen;
