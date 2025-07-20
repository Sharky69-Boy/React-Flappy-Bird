
import React from 'react';
import { BIRD_SIZE, BIRD_LEFT_POSITION } from '../constants';

interface BirdProps {
  top: number;
  rotation: number;
}

const Bird: React.FC<BirdProps> = ({ top, rotation }) => {
  return (
    <div
      className="absolute bg-yellow-400 rounded-full transition-transform duration-100 ease-linear"
      style={{
        width: `${BIRD_SIZE}px`,
        height: `${BIRD_SIZE}px`,
        top: `${top}px`,
        left: `${BIRD_LEFT_POSITION}px`,
        transform: `rotate(${rotation}deg)`,
        boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
        border: '2px solid #ca8a04'
      }}
    >
      {/* Bird Eye */}
      <div className="absolute top-1/3 left-2/3 w-3 h-3 bg-white rounded-full border-2 border-black">
        <div className="w-1.5 h-1.5 bg-black rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
};

export default Bird;
