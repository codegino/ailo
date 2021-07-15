import { generateWorldSeed } from '../../utils/__TESTS__/world-map.seed';
import { MOVE_DIRECTION } from '../movement-direction.enum';
import { Creature, Zombie } from '../units.model';
import * as faker from 'faker';
import { generateId } from '../../utils/id-generator';

it('should update coordinates when a zombie move', () => {
  const x = 0;
  const y = 0;
  const id = 1;
  const moves = [
    MOVE_DIRECTION.RIGHT,
    MOVE_DIRECTION.UP,
    MOVE_DIRECTION.LEFT,
    MOVE_DIRECTION.DOWN,
  ];

  const zombie = new Zombie({ x, y }, id, moves);

  zombie.move(generateWorldSeed({}));
  expect(zombie.moves).toEqual([
    MOVE_DIRECTION.UP,
    MOVE_DIRECTION.LEFT,
    MOVE_DIRECTION.DOWN,
  ]);
  expect(zombie.coordinates).toEqual({ x: 1, y: 0 });

  zombie.move(generateWorldSeed({}));
  expect(zombie.moves).toEqual([MOVE_DIRECTION.LEFT, MOVE_DIRECTION.DOWN]);
  expect(zombie.coordinates).toEqual({ x: 1, y: 9 });

  zombie.move(generateWorldSeed({}));
  expect(zombie.moves).toEqual([MOVE_DIRECTION.DOWN]);
  expect(zombie.coordinates).toEqual({ x: 0, y: 9 });

  zombie.move(generateWorldSeed({}));
  expect(zombie.moves).toEqual([]);
  expect(zombie.coordinates).toEqual({ x: 0, y: 0 });
});

it('should create new zombie when a creature is infected', () => {
  const moves = [];
  const zombie = new Zombie(
    { x: faker.datatype.number(), y: faker.datatype.number() },
    generateId(),
    [...moves],
  );

  const creature = new Creature({
    x: faker.datatype.number(),
    y: faker.datatype.number(),
  });

  const newZombie = zombie.infectCreature(creature);

  expect(newZombie).toEqual(new Zombie(creature.coordinates, 2, [...moves]));
});
