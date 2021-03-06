import { Coordinate } from '../../models/map.model';
import * as faker from 'faker';
import { generateWorldSeed } from './world-map.seed';
import { Creature, Zombie } from '../../models/units.model';
import { resetId } from '../id-generator';

test('generate a 10x10 world', () => {
  const MAP_DIMENSION = faker.datatype.number(100);
  const worldMap = generateWorldSeed({ dimension: MAP_DIMENSION });

  expect(worldMap).toHaveLength(MAP_DIMENSION);

  worldMap.forEach((row) => {
    expect(row).toHaveLength(MAP_DIMENSION);
  });
});

test('get initial position of a single zombie', () => {
  const MAP_DIMENSION = faker.datatype.number({ min: 2, max: 10 });
  const zombieCoordinate = {
    x: faker.datatype.number({ min: 0, max: MAP_DIMENSION - 1 }),
    y: faker.datatype.number({ min: 0, max: MAP_DIMENSION - 1 }),
  };
  const worldMap = generateWorldSeed({
    dimension: MAP_DIMENSION,
    zombie: zombieCoordinate,
  });

  expect(worldMap[zombieCoordinate.y][zombieCoordinate.x].units).toEqual([
    new Zombie({ x: zombieCoordinate.x, y: zombieCoordinate.y }, 1, []),
  ]);
});

test('other tile should be marked as empty', () => {
  const MAP_DIMENSION = 10;
  const ZOMBIE = {
    x: 0,
    y: 0,
  };
  const worldMap = generateWorldSeed({
    dimension: MAP_DIMENSION,
    zombie: ZOMBIE,
  });

  expect(worldMap[1][1].units).toEqual([]);
});

test('should not allow conflicting zombies coordinates', () => {
  const ZOMBIE_1 = {
    x: 0,
    y: 0,
  };
  const ZOMBIE_2 = {
    x: 0,
    y: 0,
  };

  expect(() => {
    generateWorldSeed({
      zombie: [ZOMBIE_1, ZOMBIE_2],
    });
  }).toThrowErrorMatchingInlineSnapshot(`"Zombie coordinates must be unique"`);
});

test('should not allow conflicting creatures coordinates', () => {
  const CREATURE_1 = {
    x: 1,
    y: 1,
  };
  const CREATURE_2 = {
    x: 1,
    y: 1,
  };

  expect(() => {
    generateWorldSeed({
      creatures: [CREATURE_1, CREATURE_2],
    });
  }).toThrowErrorMatchingInlineSnapshot(
    `"Creatures coordinates must be unique"`,
  );
});

test('should not allow conflicting coordinates for single zombie and creatures', () => {
  const ZOMBIE = {
    x: 1,
    y: 1,
  };
  const CREATURE_1 = {
    x: 1,
    y: 1,
  };
  const CREATURE_2 = {
    x: 2,
    y: 2,
  };

  expect(() => {
    generateWorldSeed({
      zombie: ZOMBIE,
      creatures: [CREATURE_1, CREATURE_2],
    });
  }).toThrowErrorMatchingInlineSnapshot(
    `"Zombie coordinate must not conflict with creatures"`,
  );
});

test('should not allow conflicting coordinates for multiple zombies and creatures', () => {
  const ZOMBIE_1 = {
    x: 1,
    y: 1,
  };
  const ZOMBIE_2 = {
    x: 3,
    y: 3,
  };

  const CREATURE_1 = {
    x: 1,
    y: 1,
  };
  const CREATURE_2 = {
    x: 2,
    y: 2,
  };

  expect(() => {
    generateWorldSeed({
      zombie: [ZOMBIE_1, ZOMBIE_2],
      creatures: [CREATURE_1, CREATURE_2],
    });
  }).toThrowErrorMatchingInlineSnapshot(
    `"Zombies coordinates must not conflict with creatures"`,
  );
});

test('get initial positions of multiple zombies', () => {
  const MAP_DIMENSION = 10;
  const ZOMBIE_1 = {
    x: 0,
    y: 0,
  };
  const ZOMBIE_2 = {
    x: 1,
    y: 1,
  };
  const ZOMBIE_3 = {
    x: 2,
    y: 1,
  };

  const worldMap = generateWorldSeed({
    dimension: MAP_DIMENSION,
    zombie: [ZOMBIE_1, ZOMBIE_2, ZOMBIE_3],
  });

  expect(worldMap[ZOMBIE_1.y][ZOMBIE_1.x].units).toEqual([
    new Zombie({ x: ZOMBIE_1.x, y: ZOMBIE_1.y }, 1, []),
  ]);
  expect(worldMap[ZOMBIE_2.y][ZOMBIE_2.x].units).toEqual([
    new Zombie({ x: ZOMBIE_2.x, y: ZOMBIE_2.y }, 2, []),
  ]);
  expect(worldMap[ZOMBIE_3.y][ZOMBIE_3.x].units).toEqual([
    new Zombie({ x: ZOMBIE_3.x, y: ZOMBIE_3.y }, 3, []),
  ]);
});

test('get initial position of the creatures', () => {
  const MAP_DIMENSION = faker.datatype.number({ min: 3, max: 10 });
  const CREATURE_1: Coordinate = {
    x: 1,
    y: 1,
  };
  const CREATURE_2: Coordinate = {
    x: 2,
    y: 2,
  };

  const worldMap = generateWorldSeed({
    dimension: MAP_DIMENSION,
    creatures: [CREATURE_1, CREATURE_2],
  });

  expect(worldMap[CREATURE_1.y][CREATURE_1.x].units).toEqual([
    new Creature({ x: CREATURE_1.x, y: CREATURE_1.y }),
  ]);

  expect(worldMap[CREATURE_2.y][CREATURE_2.x].units).toEqual([
    new Creature({ x: CREATURE_2.x, y: CREATURE_2.y }),
  ]);
});

beforeEach(() => {
  resetId();
});
