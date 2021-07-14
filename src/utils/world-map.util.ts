import { Coordinate, TileContent, WorldMap } from '../models/map.model';

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
