import { Coordinate, WorldMap } from '../../models/map.model';
import { generateMap } from '../map-generator';

export function generateWorldSeed({
  dimension = 10,
  zombie = { x: 0, y: 0 },
  creatures = [],
}: {
  dimension?: number;
  zombie?: Coordinate | Coordinate[];
  creatures?: Coordinate[];
}): WorldMap {
  return generateMap(dimension, zombie, creatures);
}
