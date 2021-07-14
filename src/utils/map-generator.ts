import { Coordinate, Tile, TileContent, WorldMap } from '../models/map.model';

export function generateMap(
  dimension: number,
  zombies: Coordinate | Coordinate[],
  creatures: Coordinate[]
): WorldMap {
  const worldMap: WorldMap = Array(dimension).fill(Array(dimension).fill(null));

  return worldMap.map((row, y): Tile[] => {
    return row.map((_, x) => {
      let isZombie: boolean;

      if (zombies instanceof Array) {
        isZombie = zombies.some((zombie) => zombie.x === x && zombie.y === y);
      } else {
        isZombie = x === zombies.x && y === zombies.y;
      }

      const isCreature = creatures.some(
        (creature) => creature.x === x && creature.y === y
      );

      return {
        content: isZombie
          ? TileContent.ZOMBIE
          : isCreature
          ? TileContent.CREATURE
          : TileContent.EMPTY,
        next: null,
        coordinate: {
          x,
          y,
        },
      };
    });
  });
}
