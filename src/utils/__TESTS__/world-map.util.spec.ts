import { Coordinate, TileContent } from '../../models/map.model';
import { getUnits } from '../world-map.util';
import { generateWorldSeed } from './world-map.seed';

test('Get all zombie coordinates', () => {
  const ZOMBIE: Coordinate = { x: 0, y: 0 };
  const worldMap = generateWorldSeed({
    zombie: ZOMBIE,
  });

  const zombies = getUnits(worldMap, TileContent.ZOMBIE);

  expect(zombies).toEqual([ZOMBIE]);
});

// test('Get all creatures coordinates', () => {
//   const CREATURES: Coordinate[] = [
//     { x: 1, y: 1 },
//     { x: 2, y: 1 },
//     { x: 3, y: 2 },
//   ];

//   const zombieApocalypse = new ZombieApocalypse(
//     generateWorldSeed({ creatures: CREATURES }),
//     [
//       MOVE_DIRECTION.DOWN,
//       MOVE_DIRECTION.LEFT,
//       MOVE_DIRECTION.UP,
//       MOVE_DIRECTION.RIGHT,
//     ]
//   );

//   const zombies = zombieApocalypse.getUnits(TileContent.CREATURE);

//   expect(zombies).toEqual([CREATURES]);
// });
