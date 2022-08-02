export enum PlayerColor {
  YELLOW = 'Y',
  RED = 'R'
}

export type Player = {
  id: number,
  name: string,
  color: PlayerColor
}

export type Position = {
  x: number,
  y: number
}

export type FourConnectedPositions = Position[]

export type CellEmpty = 'E';
export type CellState = 'R' | 'Y' | PlayerColor.RED | PlayerColor.YELLOW | CellEmpty;
export type GridState = CellState[][];