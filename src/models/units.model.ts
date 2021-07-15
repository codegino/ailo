import { generateId } from '../utils/id-generator';
import { move } from '../utils/movement';
import { Coordinate, WorldMap } from './map.model';
import { MOVE_DIRECTION } from './movement-direction.enum';

export interface Unit {
  coordinates: Coordinate;
}

export class Zombie implements Unit {
  constructor(
    public coordinates: Coordinate,
    public id: number,
    public moves: MOVE_DIRECTION[],
  ) {}

  public infectCreature(creature: Creature): Zombie {
    return new Zombie(creature.coordinates, generateId(), this.moves);
  }

  public move(map: WorldMap): void {
    const currentMove = this.moves.shift();
    if (currentMove) {
      this.coordinates = move(this.coordinates, currentMove, {
        height: map.length,
        width: map[0].length,
      });
    }
  }

  public mockMove(map: WorldMap): Coordinate {
    const currentMove = this.moves[0];
    if (currentMove) {
      return move(this.coordinates, currentMove, {
        height: map.length,
        width: map[0].length,
      });
    }
    return null;
  }
}

export class Creature implements Unit {
  constructor(public coordinates: Coordinate) {}

  doNothing(): void {
    //
  }
}
