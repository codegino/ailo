import { generateWorldSeed } from '../../utils/__TESTS__/world-map.seed';
import { Coordinate, TileContent } from '../map.model';
import { MOVE_DIRECTION } from '../movement-direction.enum';
import { ZombieApocalypse } from '../zombie-apocalypse.model';

test('Every tick should update current move direction index', () => {
  const zombieApocalypse = new ZombieApocalypse(generateWorldSeed({}), [
    MOVE_DIRECTION.DOWN,
    MOVE_DIRECTION.LEFT,
    MOVE_DIRECTION.UP,
    MOVE_DIRECTION.RIGHT,
  ]);

  expect(zombieApocalypse.currentMoveIndex).toBe(0);
  zombieApocalypse.moveUnits();
  expect(zombieApocalypse.currentMoveIndex).toBe(1);
  zombieApocalypse.moveUnits();
  expect(zombieApocalypse.currentMoveIndex).toBe(2);
  zombieApocalypse.moveUnits();
  expect(zombieApocalypse.currentMoveIndex).toBe(3);
  zombieApocalypse.moveUnits();
  expect(zombieApocalypse.currentMoveIndex).toBe(0);
});

test('Zombie position should change when moving right', () => {
  const ZOMBIE: Coordinate = { x: 0, y: 0 };
  const ZOMBIE_NEXT: Coordinate = { x: 1, y: 0 };

  const zombieApocalypse = new ZombieApocalypse(
    generateWorldSeed({
      zombie: ZOMBIE,
    }),
    [MOVE_DIRECTION.RIGHT],
  );

  expect(zombieApocalypse.worldMap[ZOMBIE.y][ZOMBIE.x].content).toBe(
    TileContent.ZOMBIE,
  );
  expect(zombieApocalypse.worldMap[ZOMBIE_NEXT.y][ZOMBIE_NEXT.x].content).toBe(
    TileContent.EMPTY,
  );

  zombieApocalypse.moveUnits();

  expect(zombieApocalypse.worldMap[ZOMBIE.y][ZOMBIE.x].content).toBe(
    TileContent.EMPTY,
  );
  expect(zombieApocalypse.worldMap[ZOMBIE_NEXT.y][ZOMBIE_NEXT.x].content).toBe(
    TileContent.ZOMBIE,
  );
});

test('creature should become a zombie when captured', () => {
  const ZOMBIE: Coordinate = { x: 0, y: 0 };
  const CREATURE: Coordinate = { x: 1, y: 0 };

  const zombieApocalypse = new ZombieApocalypse(
    generateWorldSeed({
      zombie: ZOMBIE,
      creatures: [CREATURE],
    }),
    [MOVE_DIRECTION.RIGHT, MOVE_DIRECTION.UP],
  );

  expect(zombieApocalypse.worldMap[ZOMBIE.y][ZOMBIE.x].content).toBe(
    TileContent.ZOMBIE,
  );
  expect(zombieApocalypse.worldMap[CREATURE.y][CREATURE.x].content).toBe(
    TileContent.CREATURE,
  );
  expect(zombieApocalypse.worldMap[2][0].content).toBe(TileContent.EMPTY);
});

test('consecutive capture', () => {
  const ZOMBIE: Coordinate = { x: 0, y: 0 };
  const CREATURE_1: Coordinate = { x: 1, y: 0 };
  const CREATURE_2: Coordinate = { x: 0, y: 9 };
  const CREATURE_3: Coordinate = { x: 9, y: 0 };

  const zombieApocalypse = new ZombieApocalypse(
    generateWorldSeed({
      zombie: ZOMBIE,
      creatures: [CREATURE_1, CREATURE_2, CREATURE_3],
    }),
    [
      MOVE_DIRECTION.RIGHT,
      MOVE_DIRECTION.UP,
      MOVE_DIRECTION.LEFT,
      MOVE_DIRECTION.DOWN,
    ],
  );

  // Move to right
  zombieApocalypse.moveUnits();

  expect(zombieApocalypse.worldMap[ZOMBIE.y][ZOMBIE.x + 1].content).toBe(
    TileContent.ZOMBIE,
  );
  expect(
    zombieApocalypse.worldMap[CREATURE_1.y][CREATURE_1.x + 1].content,
  ).toBe(TileContent.ZOMBIE);
  expect(zombieApocalypse.worldMap[CREATURE_2.y][CREATURE_2.x].content).toBe(
    TileContent.CREATURE,
  );
  expect(zombieApocalypse.worldMap[CREATURE_3.y][CREATURE_3.x].content).toBe(
    TileContent.CREATURE,
  );

  // Move up
  zombieApocalypse.moveUnits();

  expect(zombieApocalypse.worldMap[9][ZOMBIE.x + 1].content).toBe(
    TileContent.ZOMBIE,
  );
  expect(zombieApocalypse.worldMap[9][CREATURE_1.x + 1].content).toBe(
    TileContent.ZOMBIE,
  );
  expect(zombieApocalypse.worldMap[CREATURE_2.y][CREATURE_2.x].content).toBe(
    TileContent.CREATURE,
  );
  expect(zombieApocalypse.worldMap[CREATURE_3.y][CREATURE_3.x].content).toBe(
    TileContent.CREATURE,
  );

  // Move left
  zombieApocalypse.moveUnits();
  expect(zombieApocalypse.worldMap[9][ZOMBIE.x].content).toBe(
    TileContent.ZOMBIE,
  );
  expect(zombieApocalypse.worldMap[9][CREATURE_1.x].content).toBe(
    TileContent.ZOMBIE,
  );
  expect(zombieApocalypse.worldMap[9][9].content).toBe(TileContent.ZOMBIE);
  expect(zombieApocalypse.worldMap[CREATURE_3.y][CREATURE_3.x].content).toBe(
    TileContent.CREATURE,
  );

  // Move down
  zombieApocalypse.moveUnits();
  expect(zombieApocalypse.worldMap[0][ZOMBIE.x].content).toBe(
    TileContent.ZOMBIE,
  );
  expect(zombieApocalypse.worldMap[0][CREATURE_1.x].content).toBe(
    TileContent.ZOMBIE,
  );
  expect(zombieApocalypse.worldMap[0][CREATURE_2.x].content).toBe(
    TileContent.ZOMBIE,
  );
  expect(
    zombieApocalypse.worldMap[CREATURE_3.y + 1][CREATURE_3.x].content,
  ).toBe(TileContent.ZOMBIE);

  // // Move right AGAIN
  zombieApocalypse.moveUnits();
  expect(zombieApocalypse.worldMap[0][0].content).toBe(TileContent.ZOMBIE);
  expect(zombieApocalypse.worldMap[0][1].content).toBe(TileContent.ZOMBIE);
  expect(zombieApocalypse.worldMap[0][2].content).toBe(TileContent.ZOMBIE);
  expect(zombieApocalypse.worldMap[1][0].content).toBe(TileContent.ZOMBIE);
});
