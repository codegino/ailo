import { Coordinate, TileContent } from '../../models/map.model';
import { Creature, Zombie } from '../../models/units.model';
import { getUnits } from '../world-map.util';
import { generateWorldSeed } from './world-map.seed';

test('Get all zombie coordinates', () => {
  const ZOMBIE: Coordinate = { x: 0, y: 0 };
  const worldMap = generateWorldSeed({
    zombie: ZOMBIE,
  });

  const zombies = getUnits(worldMap, TileContent.ZOMBIE);

  expect(zombies).toEqual([new Zombie({ x: ZOMBIE.x, y: ZOMBIE.y }, 1, [])]);
});

test('Get all creatures coordinates', () => {
  const CREATURES: Coordinate[] = [
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 2 },
  ];

  const worldMap = generateWorldSeed({ creatures: CREATURES });

  const creatures = getUnits(worldMap, TileContent.CREATURE);

  expect(creatures).toEqual([
    new Creature({ x: CREATURES[0].x, y: CREATURES[0].y }),
    new Creature({ x: CREATURES[1].x, y: CREATURES[1].y }),
    new Creature({ x: CREATURES[2].x, y: CREATURES[2].y }),
  ]);
});
