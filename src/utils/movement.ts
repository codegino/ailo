import { Coordinate } from '../models/map.model';
import { MOVE_DIRECTION } from '../models/movement-direction.enum';

export function move(
  coordinate: Coordinate,
  direction: MOVE_DIRECTION,
  dimension: { height: number; width: number },
): Coordinate {
  if (dimension.height <= 1 || dimension.width <= 1) {
    throw new Error('Height and width must be greater than 1');
  }

  if (coordinate.x < 0 || coordinate.y < 0) {
    throw new Error('Coordinates must only consists of positive value');
  }

  if (coordinate.x >= dimension.width) {
    throw new Error(`x coordinate must be less than ${dimension.width - 1}`);
  }

  if (coordinate.y >= dimension.height) {
    throw new Error(`y coordinate must be less than ${dimension.height - 1}`);
  }

  if (direction === MOVE_DIRECTION.RIGHT) {
    return {
      ...coordinate,
      x: coordinate.x === dimension.width - 1 ? 0 : coordinate.x + 1,
    };
  } else if (direction === MOVE_DIRECTION.LEFT) {
    return {
      ...coordinate,
      x: coordinate.x === 0 ? dimension.width - 1 : coordinate.x - 1,
    };
  } else if (direction === MOVE_DIRECTION.UP) {
    return {
      ...coordinate,
      y: coordinate.y === 0 ? dimension.height - 1 : coordinate.y - 1,
    };
  } else if (direction === MOVE_DIRECTION.DOWN) {
    return {
      ...coordinate,
      y: coordinate.y === dimension.height - 1 ? 0 : coordinate.y + 1,
    };
  } else {
    throw new Error(`Must have a valid direction`);
  }
}
