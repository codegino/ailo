import { Coordinate, Tile, WorldMap } from '../models/map.model';
import { MOVE_DIRECTION } from '../models/movement-direction.enum';
import { Creature, Unit, Zombie } from '../models/units.model';

export function generateMap(
  dimension: number,
  zombies: Coordinate | Coordinate[],
  creatures: Coordinate[],
  moves: MOVE_DIRECTION[] = [],
): WorldMap {
  const worldMap: WorldMap = Array(dimension).fill(Array(dimension).fill(null));

  // Code to catch edge cases
  if (zombies instanceof Array) {
    const uniqueZombies = new Set(zombies.map((z) => `${z.x}-${z.y}`));
    if (uniqueZombies.size !== zombies.length) {
      throw new Error('Zombie coordinates must be unique');
    }

    const hasConflictInCreatures = zombies.some((z) =>
      hasZombieInCreaturesCoordiante(z, creatures),
    );

    if (hasConflictInCreatures) {
      throw new Error('Zombies coordinates must not conflict with creatures');
    }
  } else {
    const hasConflictInCreatures = hasZombieInCreaturesCoordiante(
      zombies,
      creatures,
    );
    if (hasConflictInCreatures) {
      throw new Error('Zombie coordinate must not conflict with creatures');
    }
  }

  const uniqueCreatures = new Set(creatures.map((c) => `${c.x}-${c.y}`));

  if (uniqueCreatures.size !== creatures.length) {
    throw new Error('Creatures coordinates must be unique');
  }

  let zombieId = 0;

  // Code for nomal cases
  return worldMap.map((row, y): Tile[] => {
    return row.map((_, x) => {
      const units: Unit[] = [];

      let isZombie: boolean;

      if (zombies instanceof Array) {
        isZombie = zombies.some((zombie) => zombie.x === x && zombie.y === y);
      } else {
        isZombie = x === zombies.x && y === zombies.y;
      }

      const isCreature = creatures.some(
        (creature) => creature.x === x && creature.y === y,
      );

      if (isZombie) {
        units.push(new Zombie({ x, y }, ++zombieId, moves));
      } else if (isCreature) {
        units.push(new Creature({ x, y }));
      }

      return {
        next: null,
        units,
        coordinate: {
          x,
          y,
        },
      };
    });
  });
}

function hasZombieInCreaturesCoordiante(
  zombies: Coordinate,
  creatures: Coordinate[],
) {
  return creatures.some((c) => c.x === zombies.x && c.y === zombies.y);
}
