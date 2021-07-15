import { Coordinate, WorldMap } from '../../models/map.model';
import { MOVE_DIRECTION } from '../../models/movement-direction.enum';
import { generateMap } from '../map-generator';

export function generateWorldSeed({
  dimension = 10,
  zombie = { x: 0, y: 0 },
  creatures = [],
  moves = [],
}: {
  dimension?: number;
  zombie?: Coordinate | Coordinate[];
  creatures?: Coordinate[];
  moves?: MOVE_DIRECTION[];
}): WorldMap {
  return generateMap(dimension, zombie, creatures, moves);
}
