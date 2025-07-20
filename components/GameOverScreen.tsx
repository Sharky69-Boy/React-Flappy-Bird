
import React from 'react';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white z-10 text-center p-4">
      <div className="bg-gray-800 bg-opacity-70 p-8 rounded-xl shadow-2xl border border-gray-600">
        <h2 className="text-5xl font-bold text-red-500" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          Game Over
        </h2>
        <p className="mt-4 text-2xl" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          Your Score: <span className="font-bold text-yellow-400">{score}</span>
        </p>
        <button
          onClick={onRestart}
          className="mt-6 px-6 py-3 bg-green-500 text-white font-bold text-xl rounded-lg shadow-lg hover:bg-green-600 transition-all transform hover:scale-105"
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default GameOverScreen;
