import { Unit } from './units.model';

export type Coordinate = {
  x: number;
  y: number;
};

export enum TileContent {
  CREATURE = 'creature',
  ZOMBIE = 'zombie',
  EMPTY = 'empty',
}

export type Tile = {
  coordinate: Coordinate;
  content?: TileContent;
  next: { unit: TileContent; id: number } | null;
  id?: number;
  units: Unit[];
};

export type WorldMap = Tile[][];
