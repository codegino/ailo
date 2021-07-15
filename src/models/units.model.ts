import { Coordinate } from './map.model';
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

  infectCreature(creature: Creature): Zombie {
    return new Zombie(creature.coordinates, this.id + 1, this.moves);
  }
}

export class Creature implements Unit {
  constructor(public coordinates: Coordinate) {}

  doNothing(): void {
    //
  }
}
