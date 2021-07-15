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
  next: { unit: TileContent; id: number } | null;
  units: Unit[];
};

export type WorldMap = Tile[][];
