import { MOVE_DIRECTION } from '../../models/movement-direction.enum';
import { move } from '../../utils/movement';
import { generateWorldSeed } from '../../utils/__TESTS__/world-map.seed';
import { ZombieApocalypse } from '../zombie-apocalypse';
import * as faker from 'faker';
import { Coordinate } from '../../models/map.model';
import { resetId } from '../../utils/id-generator';

beforeEach(() => {
  resetId();
});

test('zombie position should change when moving', () => {
  const DIMENSION = faker.datatype.number({ min: 2, max: 10 });
  const ZOMBIE: Coordinate = {
    x: faker.datatype.number({ min: 0, max: DIMENSION - 1 }),
    y: faker.datatype.number({ min: 0, max: DIMENSION - 1 }),
  };
  const DIRECTION = faker.random.arrayElement(Object.values(MOVE_DIRECTION));

  const zombieApocalypse = new ZombieApocalypse(
    generateWorldSeed({
      zombie: ZOMBIE,
      moves: [DIRECTION],
    }),
    [DIRECTION],
  );

  const { x: newX, y: newY } = move(
    ZOMBIE,
    DIRECTION,
    zombieApocalypse.dimension,
  );

  expect(zombieApocalypse.worldMap[ZOMBIE.y][ZOMBIE.x].units).toEqual([
    {
      id: 1,
      coordinates: ZOMBIE,
      moves: [DIRECTION],
    },
  ]);
  expect(zombieApocalypse.worldMap[newY][newX].units).toEqual([]);

  zombieApocalypse.moveUnits();

  expect(zombieApocalypse.worldMap[ZOMBIE.y][ZOMBIE.x].units).toEqual([]);
  expect(zombieApocalypse.worldMap[newY][newX].units).toEqual([
    {
      id: 1,
      coordinates: { x: newX, y: newY },
      moves: [],
    },
  ]);
});

test('creature should become a zombie when infected', () => {
  const ZOMBIE: Coordinate = { x: 0, y: 0 };
  const CREATURE: Coordinate = { x: 1, y: 0 };
  const MOVESET = [MOVE_DIRECTION.RIGHT];

  const zombieApocalypse = new ZombieApocalypse(
    generateWorldSeed({
      zombie: ZOMBIE,
      creatures: [CREATURE],
      moves: [...MOVESET],
    }),
    [...MOVESET],
  );

  expect(zombieApocalypse.getTile(CREATURE).units).toEqual([
    {
      coordinates: CREATURE,
    },
  ]);

  zombieApocalypse.moveUnits();

  expect(zombieApocalypse.getTile(CREATURE).units).toEqual([
    {
      id: 2,
      moves: [...MOVESET],
      coordinates: CREATURE,
    },
    {
      id: 1,
      moves: [],
      coordinates: CREATURE,
    },
  ]);

  zombieApocalypse.moveUnits();

  expect(zombieApocalypse.getTile(CREATURE).units).toEqual([
    {
      id: 1,
      moves: [],
      coordinates: CREATURE,
    },
  ]);
  expect(zombieApocalypse.getTile({ y: 0, x: 2 }).units).toEqual([
    {
      id: 2,
      moves: [],
      coordinates: { y: 0, x: 2 },
    },
  ]);

  zombieApocalypse.moveUnits();

  expect(zombieApocalypse.getTile(CREATURE).units).toEqual([
    {
      id: 1,
      moves: [],
      coordinates: CREATURE,
    },
  ]);
  expect(zombieApocalypse.getTile({ y: 0, x: 2 }).units).toEqual([
    {
      id: 2,
      moves: [],
      coordinates: { y: 0, x: 2 },
    },
  ]);
});

test('log events', () => {
  const ZOMBIE: Coordinate = { x: 0, y: 1 };
  const CREATURE_1: Coordinate = { x: 1, y: 0 };
  const CREATURE_2: Coordinate = { x: 1, y: 9 };
  const CREATURE_3: Coordinate = { x: 2, y: 9 };
  const MOVESET = [
    MOVE_DIRECTION.UP,
    MOVE_DIRECTION.RIGHT,
    MOVE_DIRECTION.LEFT,
    MOVE_DIRECTION.DOWN,
  ];

  const zombieApocalypse = new ZombieApocalypse(
    generateWorldSeed({
      zombie: ZOMBIE,
      creatures: [CREATURE_1, CREATURE_2, CREATURE_3],
      moves: [...MOVESET],
    }),
    [...MOVESET],
  );

  const logger = jest.spyOn(zombieApocalypse, 'logEvent').mockImplementation();
  jest.spyOn(global.console, 'log').mockRestore();

  zombieApocalypse.moveUnits();
  expect(logger.mock.calls).toEqual([['zombie 1 moved to (0,0)']]);
  logger.mockClear();

  zombieApocalypse.moveUnits();
  expect(logger.mock.calls).toEqual([['zombie 1 infected creature at (0,1)']]);
  logger.mockClear();

  zombieApocalypse.moveUnits();
  expect(logger.mock.calls).toEqual([
    ['zombie 1 moved to (0,0)'],
    ['zombie 2 infected creature at (9,1)'],
  ]);
  logger.mockClear();

  zombieApocalypse.moveUnits();
  expect(logger.mock.calls).toEqual([
    ['zombie 1 moved to (1,0)'],
    ['zombie 2 infected creature at (9,2)'],
    ['zombie 3 moved to (8,1)'],
  ]);
  logger.mockClear();

  zombieApocalypse.moveUnits();
  expect(logger.mock.calls).toEqual([
    ['zombie 2 moved to (9,1)'],
    ['zombie 3 moved to (8,2)'],
    ['zombie 4 moved to (8,2)'],
  ]);
  logger.mockClear();

  zombieApocalypse.moveUnits();
  expect(logger.mock.calls).toEqual([
    ['zombie 2 moved to (0,1)'],
    ['zombie 3 moved to (8,1)'],
    ['zombie 4 moved to (8,3)'],
  ]);
  logger.mockClear();

  zombieApocalypse.moveUnits();
  expect(logger.mock.calls).toEqual([
    ['zombie 3 moved to (9,1)'],
    ['zombie 4 moved to (8,2)'],
  ]);
  logger.mockClear();

  zombieApocalypse.moveUnits();
  expect(logger.mock.calls).toEqual([['zombie 4 moved to (9,2)']]);
  logger.mockClear();
});

test('end to end events with no remaining creatures', () => {
  const ZOMBIE: Coordinate = { x: 0, y: 1 };
  const CREATURE_1: Coordinate = { x: 1, y: 0 };
  const CREATURE_2: Coordinate = { x: 1, y: 9 };
  const CREATURE_3: Coordinate = { x: 2, y: 9 };
  const MOVESET = [
    MOVE_DIRECTION.UP,
    MOVE_DIRECTION.RIGHT,
    MOVE_DIRECTION.LEFT,
    MOVE_DIRECTION.DOWN,
  ];

  const zombieApocalypse = new ZombieApocalypse(
    generateWorldSeed({
      zombie: ZOMBIE,
      creatures: [CREATURE_1, CREATURE_2, CREATURE_3],
      moves: [...MOVESET],
    }),
    [...MOVESET],
  );

  const logger = jest.spyOn(zombieApocalypse, 'logEvent').mockImplementation();
  jest.spyOn(global.console, 'log').mockRestore();

  zombieApocalypse.startSimulation();
  expect(logger.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "zombie 1 moved to (0,0)",
  ],
  Array [
    "zombie 1 infected creature at (0,1)",
  ],
  Array [
    "zombie 1 moved to (0,0)",
  ],
  Array [
    "zombie 2 infected creature at (9,1)",
  ],
  Array [
    "zombie 1 moved to (1,0)",
  ],
  Array [
    "zombie 2 infected creature at (9,2)",
  ],
  Array [
    "zombie 3 moved to (8,1)",
  ],
  Array [
    "zombie 2 moved to (9,1)",
  ],
  Array [
    "zombie 3 moved to (8,2)",
  ],
  Array [
    "zombie 4 moved to (8,2)",
  ],
  Array [
    "zombie 2 moved to (0,1)",
  ],
  Array [
    "zombie 3 moved to (8,1)",
  ],
  Array [
    "zombie 4 moved to (8,3)",
  ],
  Array [
    "zombie 3 moved to (9,1)",
  ],
  Array [
    "zombie 4 moved to (8,2)",
  ],
  Array [
    "zombie 4 moved to (9,2)",
  ],
  Array [
    "zombies' positions: (0,1)(1,0)(9,1)(9,2)",
  ],
  Array [
    "creatures' positions: none",
  ],
]
`);
  logger.mockClear();
});

test('end to end events with remaining creatures', () => {
  const ZOMBIE: Coordinate = { x: 0, y: 1 };
  const CREATURE_1: Coordinate = { x: 1, y: 0 };
  const CREATURE_2: Coordinate = { x: 1, y: 9 };
  const CREATURE_3: Coordinate = { x: 3, y: 9 };
  const MOVESET = [
    MOVE_DIRECTION.UP,
    MOVE_DIRECTION.RIGHT,
    MOVE_DIRECTION.LEFT,
    MOVE_DIRECTION.DOWN,
  ];

  const zombieApocalypse = new ZombieApocalypse(
    generateWorldSeed({
      zombie: ZOMBIE,
      creatures: [CREATURE_1, CREATURE_2, CREATURE_3],
      moves: [...MOVESET],
    }),
    [...MOVESET],
  );

  const logger = jest.spyOn(zombieApocalypse, 'logEvent').mockImplementation();
  jest.spyOn(global.console, 'log').mockRestore();

  zombieApocalypse.startSimulation();
  expect(logger.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "zombie 1 moved to (0,0)",
  ],
  Array [
    "zombie 1 infected creature at (0,1)",
  ],
  Array [
    "zombie 1 moved to (0,0)",
  ],
  Array [
    "zombie 2 infected creature at (9,1)",
  ],
  Array [
    "zombie 1 moved to (1,0)",
  ],
  Array [
    "zombie 2 moved to (9,2)",
  ],
  Array [
    "zombie 3 moved to (8,1)",
  ],
  Array [
    "zombie 2 moved to (9,1)",
  ],
  Array [
    "zombie 3 moved to (8,2)",
  ],
  Array [
    "zombie 2 moved to (0,1)",
  ],
  Array [
    "zombie 3 moved to (8,1)",
  ],
  Array [
    "zombie 3 moved to (9,1)",
  ],
  Array [
    "zombies' positions: (0,1)(1,0)(9,1)",
  ],
  Array [
    "creatures' positions: (9,3)",
  ],
]
`);
  logger.mockClear();
});
