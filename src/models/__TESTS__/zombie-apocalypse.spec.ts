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
  const CREATURE_2: Coordinate = { x: 4, y: 0 };

  const zombieApocalypse = new ZombieApocalypse(
    generateWorldSeed({
      zombie: ZOMBIE,
      creatures: [CREATURE_1, CREATURE_2],
    }),
    [MOVE_DIRECTION.RIGHT, MOVE_DIRECTION.UP],
  );

  expect(zombieApocalypse.worldMap[ZOMBIE.y][ZOMBIE.x].content).toBe(
    TileContent.ZOMBIE,
  );
  expect(zombieApocalypse.worldMap[CREATURE_1.y][CREATURE_1.x].content).toBe(
    TileContent.CREATURE,
  );
  expect(zombieApocalypse.worldMap[CREATURE_2.y][CREATURE_2.x].content).toBe(
    TileContent.CREATURE,
  );

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
});
