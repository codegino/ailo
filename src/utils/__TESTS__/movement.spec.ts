import { MOVE_DIRECTION } from '../../models/movement-direction.enum';
import { move } from '../movement';
import * as faker from 'faker';

test('Move to right from NON right edge of the map', () => {
  const DIMENSION = 10;
  const x = faker.datatype.number({ min: 0, max: DIMENSION - 2 });
  const y = faker.datatype.number(DIMENSION - 1);

  const coordinate = move({ x, y }, MOVE_DIRECTION.RIGHT, {
    height: DIMENSION,
    width: DIMENSION,
  });

  expect(coordinate).toEqual({ x: x + 1, y });
});

test('Move to right from right edge of the map', () => {
  const DIMENSION = 10;
  const x = DIMENSION - 1;
  const y = faker.datatype.number(DIMENSION - 1);

  const coordinate = move({ x, y }, MOVE_DIRECTION.RIGHT, {
    height: DIMENSION,
    width: DIMENSION,
  });

  expect(coordinate).toEqual({ x: 0, y });
});

test('Move left from NON left edge of the map', () => {
  const DIMENSION = 10;
  const x = faker.datatype.number({ min: 1, max: DIMENSION - 1 });
  const y = faker.datatype.number(DIMENSION - 1);

  const coordinate = move({ x, y }, MOVE_DIRECTION.LEFT, {
    height: DIMENSION,
    width: DIMENSION,
  });

  expect(coordinate).toEqual({ x: x - 1, y });
});

test('Move left from left edge of the map', () => {
  const DIMENSION = 10;
  const x = 0;
  const y = faker.datatype.number(DIMENSION - 1);

  const coordinate = move({ x, y }, MOVE_DIRECTION.LEFT, {
    height: DIMENSION,
    width: DIMENSION,
  });

  expect(coordinate).toEqual({ x: DIMENSION - 1, y });
});

test('Move up from NON top edge of the map', () => {
  const DIMENSION = 10;
  const x = faker.datatype.number(DIMENSION - 1);
  const y = faker.datatype.number({ min: 1, max: DIMENSION - 1 });

  const coordinate = move({ x, y }, MOVE_DIRECTION.UP, {
    height: DIMENSION,
    width: DIMENSION,
  });

  expect(coordinate).toEqual({ x, y: y - 1 });
});

test('Move up from top edge of the map', () => {
  const DIMENSION = 10;
  const x = faker.datatype.number(DIMENSION - 1);
  const y = 0;

  const coordinate = move({ x, y }, MOVE_DIRECTION.UP, {
    height: DIMENSION,
    width: DIMENSION,
  });

  expect(coordinate).toEqual({ x, y: DIMENSION - 1 });
});

test('Move down from NON bottom edge of the map', () => {
  const DIMENSION = 10;
  const x = faker.datatype.number(DIMENSION - 1);
  const y = faker.datatype.number({ min: 0, max: DIMENSION - 2 });

  const coordinate = move({ x, y }, MOVE_DIRECTION.DOWN, {
    height: DIMENSION,
    width: DIMENSION,
  });

  expect(coordinate).toEqual({ x, y: y + 1 });
});

test('Move down from bottom edge of the map', () => {
  const DIMENSION = 10;
  const x = faker.datatype.number(DIMENSION - 1);
  const y = DIMENSION - 1;

  const coordinate = move({ x, y }, MOVE_DIRECTION.DOWN, {
    height: DIMENSION,
    width: DIMENSION,
  });

  expect(coordinate).toEqual({ x, y: 0 });
});

test('Should throw an exception for invalid direction', () => {
  const DIMENSION = 10;
  const x = faker.datatype.number(DIMENSION - 1);
  const y = DIMENSION - 1;
  const INVALID_DIRECTION = faker.random.word() as MOVE_DIRECTION;

  expect(() =>
    move({ x, y }, INVALID_DIRECTION, {
      height: DIMENSION,
      width: DIMENSION,
    }),
  ).toThrowErrorMatchingInlineSnapshot(`"Must have a valid direction"`);
});

test('Should throw an exception for negative coordinates', () => {
  const DIMENSION = 10;
  const x = faker.datatype.number(-1);
  const y = faker.datatype.number(-1);

  expect(() =>
    move({ x, y }, MOVE_DIRECTION.DOWN, {
      height: DIMENSION,
      width: DIMENSION,
    }),
  ).toThrowErrorMatchingInlineSnapshot(
    `"Coordinates must only consists of positive value"`,
  );
});

test('Should throw an exception if x is greater than or equal to width', () => {
  const DIMENSION = 10;
  const x = faker.datatype.number({ min: DIMENSION });
  const y = faker.datatype.number(DIMENSION - 1);

  expect(() =>
    move({ x, y }, MOVE_DIRECTION.DOWN, {
      height: DIMENSION,
      width: DIMENSION,
    }),
  ).toThrowError(`x coordinate must be less than ${DIMENSION - 1}`);
});

test('Should throw an exception if y is greater than or equal to height', () => {
  const DIMENSION = 10;
  const x = faker.datatype.number(DIMENSION - 1);
  const y = faker.datatype.number({ min: DIMENSION });

  expect(() =>
    move({ x, y }, MOVE_DIRECTION.DOWN, {
      height: DIMENSION,
      width: DIMENSION,
    }),
  ).toThrowError(`y coordinate must be less than ${DIMENSION - 1}`);
});

test('Should throw an exception if dimension is less than 2', () => {
  const DIMENSION = faker.datatype.number(1);
  const x = faker.datatype.number(DIMENSION - 1);
  const y = faker.datatype.number({ min: DIMENSION });

  expect(() =>
    move({ x, y }, MOVE_DIRECTION.DOWN, {
      height: DIMENSION,
      width: DIMENSION,
    }),
  ).toThrowErrorMatchingInlineSnapshot(
    `"Height and width must be greater than 1"`,
  );
});
