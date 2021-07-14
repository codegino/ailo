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
  content: TileContent;
  next: TileContent | null;
};

export type WorldMap = Tile[][];
