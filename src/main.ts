import { Coordinate } from './models/map.model';
import { MOVE_DIRECTION } from './models/movement-direction.enum';
import { ZombieApocalypse } from './models/zombie-apocalypse.model';
import { generateMap } from './utils/map-generator';

import * as inquier from 'inquirer';

function convertStringToValidMovements(moves: string): MOVE_DIRECTION[] {
  const splitted = moves.split('');

  return splitted.map((move) => {
    switch (move) {
      case 'U':
      case 'u':
        return MOVE_DIRECTION.UP;
      case 'D':
      case 'd':
        return MOVE_DIRECTION.DOWN;
      case 'R':
      case 'r':
        return MOVE_DIRECTION.RIGHT;
      case 'L':
      case 'l':
        return MOVE_DIRECTION.LEFT;
      default:
        throw new Error('Must be a valid movement character');
    }
  });
}

function parseZombieCoordinate(value: string): Coordinate {
  const [y, x] = value.split(',');

  return {
    y: +y,
    x: +x,
  };
}

let zombieApocalypse: ZombieApocalypse;

async function setupEnvironment() {
  const { dimension } = await inquier.prompt([
    {
      name: 'dimension',
      message: 'What is the dimension in nxn?',
      type: 'number',
    },
  ]);

  const { movements } = await inquier.prompt([
    {
      name: 'movements',
      message:
        'What are the movements(R[right], L[left], U[up], D[down])? e.g RRUD',
      type: 'input',
    },
  ]);

  const { zombie } = await inquier.prompt([
    {
      name: 'zombie',
      message: 'What is the initial coordinate of zombie(y,x)? e.g. 0,0 or 2,1',
      type: 'input',
    },
  ]);

  const DIMENSION = +dimension;
  const MOVEMENTS = convertStringToValidMovements(movements);
  const ZOMBIE = parseZombieCoordinate(zombie);

  const CREATURES: Coordinate[] = [
    { y: 0, x: 1 },
    { y: 0, x: 2 },
  ];

  const worldMap = generateMap(DIMENSION, ZOMBIE, CREATURES);

  zombieApocalypse = new ZombieApocalypse(worldMap, MOVEMENTS);
}

async function askForAction(action = 'start') {
  const result = await inquier.prompt([
    {
      name: 'action',
      message: 'What do you want to do?',
      type: 'list',
      choices: [
        { name: 'move', value: 'move' },
        { name: 'quit', value: 'quit' },
      ],
    },
  ]);
  action = result.action;

  if (action === 'move') {
    zombieApocalypse.moveUnits();
    zombieApocalypse.printMap();
    await askForAction();
  } else if (action === 'quit') {
    return;
  }
}

(async function startApplication() {
  await setupEnvironment();
  await askForAction();
})();
