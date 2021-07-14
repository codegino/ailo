import { generateWorldSeed } from '../../utils/__TESTS__/world-map.seed';
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

// test('Zombie position should change when moving right', () => {
//   const ZOMBIE: Coordinate = { x: 0, y: 0 };
//   const DIMENSION = 10;

//   const zombieApocalypse = new ZombieApocalypse(
//     generateWorldUtil({
//       zombie: ZOMBIE,
//     }),
//     [MOVE_DIRECTION.RIGHT]
//   );

//   const newCoordinate = move(ZOMBIE, MOVE_DIRECTION.RIGHT, {
//     height: DIMENSION,
//     width: DIMENSION,
//   });

//   zombieApocalypse.moveUnits();

//   expect(zombieApocalypse.worldMap[ZOMBIE.x][ZOMBIE.y].content).toBe(
//     TileContent.ZOMBIE
//   );
//   expect(
//     zombieApocalypse.worldMap[newCoordinate.x][newCoordinate.y].content
//   ).toBe(TileContent.EMPTY);
//   zombieApocalypse.moveUnits();
//   expect(zombieApocalypse.worldMap[ZOMBIE.x][ZOMBIE.y].next).toBe(
//     TileContent.EMPTY
//   );
//   expect(zombieApocalypse.worldMap[newCoordinate.x][newCoordinate.y].next).toBe(
//     TileContent.ZOMBIE
//   );
// });
