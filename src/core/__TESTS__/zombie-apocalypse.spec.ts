// import { generateWorldSeed } from '../../utils/__TESTS__/world-map.seed';
// import { Coordinate, TileContent } from '../../models/map.model';
// import { MOVE_DIRECTION } from '../../models/movement-direction.enum';
// import { ZombieApocalypse } from '../zombie-apocalypse.model';

import { MOVE_DIRECTION } from '../../models/movement-direction.enum';
import { move } from '../../utils/movement';
// import { Zombie } from '../../models/units.model';
// import { Zombie } from '../../models/units.model';
// import { generateId } from '../../utils/id-generator';
import { generateWorldSeed } from '../../utils/__TESTS__/world-map.seed';
import { ZombieApocalypse } from '../zombie-apocalypse.model';
import * as faker from 'faker';

test('asdf', () => {
  expect(1).toBe(1);
});

test('Zombie position should change when moving', () => {
  const DIMENSION = faker.datatype.number({ min: 2, max: 10 });
  const ZOMBIE = {
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

  zombieApocalypse.moveUnits();

  expect(zombieApocalypse.worldMap[ZOMBIE.y][ZOMBIE.x].units).toEqual([]);
  expect(zombieApocalypse.worldMap[newY][newX].units[0]).toEqual({
    id: 1,
    coordinates: { x: newX, y: newY },
    moves: [],
  });
});

// test('creature should become a zombie when infected', () => {
//   const ZOMBIE: Coordinate = { x: 0, y: 0 };
//   const CREATURE: Coordinate = { x: 1, y: 0 };

//   const zombieApocalypse = new ZombieApocalypse(
//     generateWorldSeed({
//       zombie: ZOMBIE,
//       creatures: [CREATURE],
//     }),
//     [MOVE_DIRECTION.RIGHT],
//   );

//   expect(zombieApocalypse.worldMap[ZOMBIE.y][ZOMBIE.x].content).toBe(
//     TileContent.ZOMBIE,
//   );
//   expect(zombieApocalypse.worldMap[CREATURE.y][CREATURE.x].content).toBe(
//     TileContent.CREATURE,
//   );
//   expect(zombieApocalypse.worldMap[CREATURE.y][CREATURE.x + 1].content).toBe(
//     TileContent.EMPTY,
//   );

//   zombieApocalypse.moveUnits();

//   expect(zombieApocalypse.worldMap[ZOMBIE.y][ZOMBIE.x].content).toBe(
//     TileContent.EMPTY,
//   );
//   expect(zombieApocalypse.worldMap[ZOMBIE.y][ZOMBIE.x + 1].content).toBe(
//     TileContent.ZOMBIE,
//   );
//   expect(zombieApocalypse.worldMap[CREATURE.y][CREATURE.x + 1].content).toBe(
//     TileContent.ZOMBIE,
//   );
// });

// it('multiple creature should become a zombies during chain infection', () => {
//   const ZOMBIE: Coordinate = { x: 0, y: 0 };
//   const CREATURE_1: Coordinate = { x: 1, y: 0 };
//   const CREATURE_2: Coordinate = { x: 2, y: 0 };
//   const CREATURE_3: Coordinate = { x: 3, y: 0 };

//   const zombieApocalypse = new ZombieApocalypse(
//     generateWorldSeed({
//       zombie: ZOMBIE,
//       creatures: [CREATURE_1, CREATURE_2, CREATURE_3],
//     }),
//     [MOVE_DIRECTION.RIGHT, MOVE_DIRECTION.UP],
//   );

//   expect(zombieApocalypse.worldMap[ZOMBIE.y][ZOMBIE.x].content).toBe(
//     TileContent.ZOMBIE,
//   );
//   expect(zombieApocalypse.worldMap[CREATURE_1.y][CREATURE_1.x].content).toBe(
//     TileContent.CREATURE,
//   );
//   expect(zombieApocalypse.worldMap[CREATURE_2.y][CREATURE_2.x].content).toBe(
//     TileContent.CREATURE,
//   );
//   expect(zombieApocalypse.worldMap[CREATURE_3.y][CREATURE_3.x].content).toBe(
//     TileContent.CREATURE,
//   );

//   zombieApocalypse.printMap();
//   zombieApocalypse.moveUnits();
//   zombieApocalypse.printMap();

//   expect(zombieApocalypse.worldMap[ZOMBIE.y][ZOMBIE.x].content).toBe(
//     TileContent.EMPTY,
//   );
//   expect(zombieApocalypse.worldMap[ZOMBIE.y][ZOMBIE.x + 1].content).toBe(
//     TileContent.ZOMBIE,
//   );
//   expect(zombieApocalypse.worldMap[ZOMBIE.y][ZOMBIE.x + 1].id).toBe(1);
//   expect(
//     zombieApocalypse.worldMap[CREATURE_1.y][CREATURE_1.x + 1].content,
//   ).toBe(TileContent.ZOMBIE);
//   expect(zombieApocalypse.worldMap[ZOMBIE.y][CREATURE_1.x + 1].id).toBe(2);
//   expect(
//     zombieApocalypse.worldMap[CREATURE_2.y][CREATURE_2.x + 1].content,
//   ).toBe(TileContent.ZOMBIE);
//   expect(zombieApocalypse.worldMap[ZOMBIE.y][CREATURE_2.x + 1].id).toBe(3);
//   expect(
//     zombieApocalypse.worldMap[CREATURE_3.y][CREATURE_3.x + 1].content,
//   ).toBe(TileContent.ZOMBIE);
//   expect(zombieApocalypse.worldMap[ZOMBIE.y][CREATURE_3.x + 1].id).toBe(4);
// });

// test('consecutive capture', () => {
//   const ZOMBIE: Coordinate = { x: 0, y: 0 };
//   const CREATURE_1: Coordinate = { x: 1, y: 0 };
//   const CREATURE_2: Coordinate = { x: 0, y: 9 };
//   const CREATURE_3: Coordinate = { x: 9, y: 0 };

//   const zombieApocalypse = new ZombieApocalypse(
//     generateWorldSeed({
//       zombie: ZOMBIE,
//       creatures: [CREATURE_1, CREATURE_2, CREATURE_3],
//     }),
//     [
//       MOVE_DIRECTION.RIGHT,
//       MOVE_DIRECTION.UP,
//       MOVE_DIRECTION.LEFT,
//       MOVE_DIRECTION.DOWN,
//     ],
//   );

//   // Move to right
//   zombieApocalypse.moveUnits();

//   expect(zombieApocalypse.worldMap[ZOMBIE.y][ZOMBIE.x + 1].content).toBe(
//     TileContent.ZOMBIE,
//   );
//   expect(
//     zombieApocalypse.worldMap[CREATURE_1.y][CREATURE_1.x + 1].content,
//   ).toBe(TileContent.ZOMBIE);
//   expect(zombieApocalypse.worldMap[CREATURE_2.y][CREATURE_2.x].content).toBe(
//     TileContent.CREATURE,
//   );
//   expect(zombieApocalypse.worldMap[CREATURE_3.y][CREATURE_3.x].content).toBe(
//     TileContent.CREATURE,
//   );

//   // Move up
//   zombieApocalypse.moveUnits();

//   expect(zombieApocalypse.worldMap[9][ZOMBIE.x + 1].content).toBe(
//     TileContent.ZOMBIE,
//   );
//   expect(zombieApocalypse.worldMap[9][CREATURE_1.x + 1].content).toBe(
//     TileContent.ZOMBIE,
//   );
//   expect(zombieApocalypse.worldMap[CREATURE_2.y][CREATURE_2.x].content).toBe(
//     TileContent.CREATURE,
//   );
//   expect(zombieApocalypse.worldMap[CREATURE_3.y][CREATURE_3.x].content).toBe(
//     TileContent.CREATURE,
//   );

//   // Move left
//   zombieApocalypse.moveUnits();
//   expect(zombieApocalypse.worldMap[9][ZOMBIE.x].content).toBe(
//     TileContent.ZOMBIE,
//   );
//   expect(zombieApocalypse.worldMap[9][CREATURE_1.x].content).toBe(
//     TileContent.ZOMBIE,
//   );
//   expect(zombieApocalypse.worldMap[9][9].content).toBe(TileContent.ZOMBIE);
//   expect(zombieApocalypse.worldMap[CREATURE_3.y][CREATURE_3.x].content).toBe(
//     TileContent.CREATURE,
//   );

//   // Move down
//   zombieApocalypse.moveUnits();
//   expect(zombieApocalypse.worldMap[0][ZOMBIE.x].content).toBe(
//     TileContent.ZOMBIE,
//   );
//   expect(zombieApocalypse.worldMap[0][CREATURE_1.x].content).toBe(
//     TileContent.ZOMBIE,
//   );
//   expect(zombieApocalypse.worldMap[0][CREATURE_2.x].content).toBe(
//     TileContent.ZOMBIE,
//   );
//   expect(
//     zombieApocalypse.worldMap[CREATURE_3.y + 1][CREATURE_3.x].content,
//   ).toBe(TileContent.ZOMBIE);

//   // // Move right AGAIN
//   zombieApocalypse.moveUnits();
//   expect(zombieApocalypse.worldMap[0][0].content).toBe(TileContent.ZOMBIE);
//   expect(zombieApocalypse.worldMap[0][1].content).toBe(TileContent.ZOMBIE);
//   expect(zombieApocalypse.worldMap[0][2].content).toBe(TileContent.ZOMBIE);
//   expect(zombieApocalypse.worldMap[1][0].content).toBe(TileContent.ZOMBIE);
// });

// test('log events', () => {
//   const ZOMBIE: Coordinate = { x: 0, y: 0 };
//   const CREATURE_1: Coordinate = { x: 1, y: 0 };
//   const CREATURE_2: Coordinate = { x: 0, y: 9 };
//   const CREATURE_3: Coordinate = { x: 9, y: 0 };

//   const zombieApocalypse = new ZombieApocalypse(
//     generateWorldSeed({
//       zombie: ZOMBIE,
//       creatures: [CREATURE_1, CREATURE_2, CREATURE_3],
//     }),
//     [
//       MOVE_DIRECTION.RIGHT,
//       MOVE_DIRECTION.UP,
//       MOVE_DIRECTION.LEFT,
//       MOVE_DIRECTION.DOWN,
//     ],
//   );

//   const logger = jest.spyOn(zombieApocalypse, 'logEvent').mockImplementation();

//   // Move right
//   zombieApocalypse.moveUnits();
//   expect(logger.mock.calls).toEqual([
//     ['zombie 1 infected creature at (0,1)'],
//     ['new zombie 2 moved to (0,2)'],
//   ]);
//   logger.mockClear();

//   // // // Move up
//   zombieApocalypse.moveUnits();
//   expect(logger.mock.calls).toEqual([
//     ['zombie 1 moved to (9,1)'],
//     ['zombie 2 moved to (9,2)'],
//   ]);
//   logger.mockClear();

//   // // // Move left
//   zombieApocalypse.moveUnits();
//   expect(logger.mock.calls).toEqual([
//     ['zombie 1 infected creature at (9,0)'],
//     ['new zombie 3 moved to (9,9)'],
//     ['zombie 2 moved to (9,1)'],
//   ]);
//   logger.mockClear();

//   // // // Move left
//   zombieApocalypse.moveUnits();
//   expect(logger.mock.calls).toEqual([
//     ['zombie 1 moved to (0,0)'],
//     ['zombie 2 moved to (0,1)'],
//     ['zombie 3 infected creature at (0,9)'],
//     ['new zombie 4 moved to (1,9)'],
//   ]);
//   logger.mockClear();

//   // // // Move right AGAIN
//   zombieApocalypse.moveUnits();
//   expect(logger.mock.calls).toEqual([
//     ['zombie 1 moved to (0,1)'],
//     ['zombie 2 moved to (0,2)'],
//     ['zombie 3 moved to (0,0)'],
//     ['zombie 4 moved to (1,0)'],
//   ]);
//   logger.mockRestore();
// });
