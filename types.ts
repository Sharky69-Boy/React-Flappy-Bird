
export enum GameState {
  Start,
  Playing,
  GameOver,
}

export interface Pipe {
  left: number;
  topHeight: number;
  scored: boolean;
}
