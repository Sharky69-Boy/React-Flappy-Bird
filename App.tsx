import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  BIRD_SIZE,
  BIRD_LEFT_POSITION,
  GRAVITY,
  JUMP_STRENGTH,
  PIPE_WIDTH,
  PIPE_GAP,
  PIPE_SPEED,
  PIPE_SPAWN_DISTANCE,
  BIRD_FLAP_ROTATION,
  BIRD_FALL_ROTATION,
} from './constants';
import { GameState, Pipe } from './types';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import GameScreen from './components/GameScreen';

const generateInitialPipes = (): Pipe[] => {
    const initialPipes: Pipe[] = [];
    const pipeCount = Math.ceil(GAME_WIDTH / PIPE_SPAWN_DISTANCE) + 1;
    for (let i = 1; i <= pipeCount; i++) {
        initialPipes.push({
            left: GAME_WIDTH + i * PIPE_SPAWN_DISTANCE,
            topHeight: Math.random() * (GAME_HEIGHT - PIPE_GAP - 200) + 100,
            scored: false,
        });
    }
    return initialPipes;
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [birdPosition, setBirdPosition] = useState<number>(GAME_HEIGHT / 2 - BIRD_SIZE / 2);
  const [birdVelocity, setBirdVelocity] = useState<number>(0);
  const [birdRotation, setBirdRotation] = useState<number>(0);
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [score, setScore] = useState<number>(0);

  const gameLoopRef = useRef<number>();
  
  const resetGame = useCallback(() => {
    setGameState(GameState.Start);
    setBirdPosition(GAME_HEIGHT / 2 - BIRD_SIZE / 2);
    setBirdVelocity(0);
    setBirdRotation(0);
    setPipes(generateInitialPipes());
    setScore(0);
  }, []);

  const handleJump = useCallback(() => {
    if (gameState === GameState.Playing) {
      setBirdVelocity(-JUMP_STRENGTH);
      setBirdRotation(BIRD_FLAP_ROTATION);
    }
  }, [gameState]);
  
  const startGame = useCallback(() => {
    if (gameState === GameState.Start || gameState === GameState.GameOver) {
      resetGame();
      setGameState(GameState.Playing);
      // Directly set velocity and rotation for the first jump
      // as the gameState update is asynchronous and handleJump would not work as expected.
      setBirdVelocity(-JUMP_STRENGTH);
      setBirdRotation(BIRD_FLAP_ROTATION);
    }
  }, [gameState, resetGame]);


  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        if (gameState === GameState.Playing) {
            handleJump();
        } else {
            startGame();
        }
      }
    };
    
    const handleMouseClick = () => {
        if (gameState === GameState.Playing) {
            handleJump();
        } else {
            startGame();
        }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('mousedown', handleMouseClick);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('mousedown', handleMouseClick);
    };
  }, [gameState, handleJump, startGame]);

  const gameLoop = useCallback(() => {
    if (gameState !== GameState.Playing) return;

    // Bird physics
    setBirdVelocity(v => v + GRAVITY);
    setBirdPosition(p => {
        const newPosition = p + birdVelocity;
        // Clamp position to prevent going off top of screen
        return Math.max(0, newPosition);
    });
    // Bird rotation
    setBirdRotation(r => Math.min(BIRD_FALL_ROTATION, r + GRAVITY * 4));


    // Pipe movement & generation
    let newScore = score;
    const newPipes = pipes.map(pipe => {
      const newLeft = pipe.left - PIPE_SPEED;

      // Scoring
      if (!pipe.scored && newLeft + PIPE_WIDTH < BIRD_LEFT_POSITION) {
        newScore++;
        return { ...pipe, left: newLeft, scored: true };
      }
      return { ...pipe, left: newLeft };
    }).filter(pipe => pipe.left > -PIPE_WIDTH);

    // Add new pipe
    const lastPipe = newPipes[newPipes.length - 1];
    if (lastPipe && GAME_WIDTH - lastPipe.left > PIPE_SPAWN_DISTANCE) {
      newPipes.push({
        left: lastPipe.left + PIPE_SPAWN_DISTANCE,
        topHeight: Math.random() * (GAME_HEIGHT - PIPE_GAP - 200) + 100,
        scored: false,
      });
    }

    setPipes(newPipes);
    setScore(newScore);

    // Collision detection
    const birdBottom = birdPosition + BIRD_SIZE;
    if (birdBottom > GAME_HEIGHT) {
      setGameState(GameState.GameOver);
      return;
    }

    for (const pipe of pipes) {
      const birdRight = BIRD_LEFT_POSITION + BIRD_SIZE;
      const pipeRight = pipe.left + PIPE_WIDTH;

      if (
        birdRight > pipe.left &&
        BIRD_LEFT_POSITION < pipeRight &&
        (birdPosition < pipe.topHeight || birdBottom > pipe.topHeight + PIPE_GAP)
      ) {
        setGameState(GameState.GameOver);
        return;
      }
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, birdVelocity, birdPosition, pipes, score]);


  useEffect(() => {
    if (gameState === GameState.Playing) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, gameLoop]);
  
  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case GameState.Start:
        return <StartScreen onStart={startGame} />;
      case GameState.Playing:
        return <GameScreen birdPosition={birdPosition} birdRotation={birdRotation} pipes={pipes} score={score} />;
      case GameState.GameOver:
        return (
          <>
            <GameScreen birdPosition={birdPosition} birdRotation={birdRotation} pipes={pipes} score={score} />
            <GameOverScreen score={score} onRestart={resetGame} />
          </>
        );
    }
  };

  return (
    <div
      className="relative overflow-hidden bg-sky-400"
      style={{
        width: `${GAME_WIDTH}px`,
        height: `${GAME_HEIGHT}px`,
        backgroundImage: 'linear-gradient(to bottom, #7dd3fc, #38bdf8, #0ea5e9)',
        border: '4px solid black',
        borderRadius: '10px'
      }}
    >
      {renderContent()}
    </div>
  );
};

export default App;
