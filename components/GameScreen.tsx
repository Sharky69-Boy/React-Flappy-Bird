
import React from 'react';
import Bird from './Bird';
import PipeComponent from './Pipe';
import { Pipe } from '../types';

interface GameScreenProps {
  birdPosition: number;
  birdRotation: number;
  pipes: Pipe[];
  score: number;
}

const GameScreen: React.FC<GameScreenProps> = ({ birdPosition, birdRotation, pipes, score }) => {
  return (
    <>
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-5xl font-bold"
        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
      >
        {score}
      </div>
      <Bird top={birdPosition} rotation={birdRotation} />
      {pipes.map((pipe, index) => (
        <PipeComponent key={index} left={pipe.left} topHeight={pipe.topHeight} />
      ))}
    </>
  );
};

export default GameScreen;
