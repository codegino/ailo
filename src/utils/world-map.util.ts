import { WorldMap } from '../models/map.model';
import { Creature, Unit, Zombie } from '../models/units.model';

export function getUnits(
  worldMap: WorldMap,
  type: 'zombie' | 'creature',
): Unit[] {
  const units: Unit[] = [];

  worldMap.forEach((row) => {
    row.forEach((tile) => {
      tile.units.forEach((unit) => {
        if (type === 'zombie') {
          if (unit instanceof Zombie) {
            units.push(unit);
          }
        } else if (type === 'creature') {
          if (unit instanceof Creature) {
            units.push(unit);
          }
        }
      });
    });
  });

  return units;
}
