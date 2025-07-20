
import React from 'react';
import { PIPE_WIDTH, PIPE_GAP, GAME_HEIGHT } from '../constants';

interface PipeProps {
  left: number;
  topHeight: number;
}

const Pipe: React.FC<PipeProps> = ({ left, topHeight }) => {
  const bottomPipeTop = topHeight + PIPE_GAP;

  return (
    <>
      {/* Top Pipe */}
      <div
        className="absolute bg-green-500 border-4 border-green-700 rounded-b-md"
        style={{
          left: `${left}px`,
          top: 0,
          width: `${PIPE_WIDTH}px`,
          height: `${topHeight}px`,
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.4)',
        }}
      >
        <div className="absolute bottom-0 w-full h-8 bg-green-600 border-t-4 border-green-700 rounded-b-md" />
      </div>
      {/* Bottom Pipe */}
      <div
        className="absolute bg-green-500 border-4 border-green-700 rounded-t-md"
        style={{
          left: `${left}px`,
          top: `${bottomPipeTop}px`,
          width: `${PIPE_WIDTH}px`,
          height: `${GAME_HEIGHT - bottomPipeTop}px`,
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.4)',
        }}
      >
         <div className="absolute top-0 w-full h-8 bg-green-600 border-b-4 border-green-700 rounded-t-md" />
      </div>
    </>
  );
};

export default Pipe;
