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

  expect(zombieApocalypse.worldMap[ZOMBIE.y][ZOMBIE.x].next).toBe(
    TileContent.EMPTY,
  );
  expect(zombieApocalypse.worldMap[ZOMBIE_NEXT.y][ZOMBIE_NEXT.x].next).toBe(
    TileContent.ZOMBIE,
  );
});

test('creature should become a zombie when captured', () => {
  const ZOMBIE: Coordinate = { x: 0, y: 0 };
  const CREATURE: Coordinate = { x: 1, y: 0 };
  const CREATURE_NEXT: Coordinate = { x: 2, y: 0 };

  const zombieApocalypse = new ZombieApocalypse(
    generateWorldSeed({
      zombie: ZOMBIE,
      creatures: [CREATURE],
    }),
    [MOVE_DIRECTION.RIGHT],
  );

  expect(zombieApocalypse.worldMap[ZOMBIE.y][ZOMBIE.x].content).toBe(
    TileContent.ZOMBIE,
  );
  expect(zombieApocalypse.worldMap[CREATURE.y][CREATURE.x].content).toBe(
    TileContent.CREATURE,
  );
  expect(
    zombieApocalypse.worldMap[CREATURE_NEXT.y][CREATURE_NEXT.x].content,
  ).toBe(TileContent.EMPTY);

  zombieApocalypse.moveUnits();

  expect(zombieApocalypse.worldMap[ZOMBIE.y][ZOMBIE.x].next).toBe(
    TileContent.EMPTY,
  );
  expect(zombieApocalypse.worldMap[CREATURE.y][CREATURE.x].next).toBe(
    TileContent.ZOMBIE,
  );
  expect(zombieApocalypse.worldMap[CREATURE_NEXT.y][CREATURE_NEXT.x].next).toBe(
    TileContent.ZOMBIE,
  );
});
