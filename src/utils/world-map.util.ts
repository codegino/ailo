import { Coordinate, TileContent, WorldMap } from '../models/map.model';
import { Creature, Unit, Zombie } from '../models/units.model';

export function getUnits(worldMap: WorldMap, unit: TileContent): Coordinate[] {
  const units: Coordinate[] = [];

  worldMap.forEach((row) => {
    row.forEach((tile) => {
      if (tile.content === unit) {
        units.push(tile.coordinate);
      }
    });
  });

  return units;
}

export function getZombies(
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
