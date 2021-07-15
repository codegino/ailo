import { Coordinate } from './models/map.model';
import { MOVE_DIRECTION } from './models/movement-direction.enum';
import { ZombieApocalypse } from './core/zombie-apocalypse';
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

function parseCreatures(value: string): Coordinate[] {
  const splitted = value.split(';');

  return splitted.map((creature) => {
    const [y, x] = creature.split(',');

    return {
      y: +y,
      x: +x,
    };
  });
}

let zombieApocalypse: ZombieApocalypse;

async function setupEnvironment() {
  const { dimension } = await inquier.prompt([
    {
      name: 'dimension',
      message: 'What is the dimension in nxn?',
      type: 'number',
      default: '10',
    },
  ]);

  const { movements } = await inquier.prompt([
    {
      name: 'movements',
      message: 'What are the movements(R[right], L[left], U[up], D[down])?',
      type: 'input',
      default: 'RDRU',
    },
  ]);

  const { zombie } = await inquier.prompt([
    {
      name: 'zombie',
      message: 'What is the initial coordinate of zombie(y,x)?',
      type: 'input',
      default: '0,0',
    },
  ]);

  const { creatures } = await inquier.prompt([
    {
      name: 'creatures',
      message: 'What is the initial coordinates of creatures(y,x)?',
      type: '',
      default: '0,1;0,2;0,3;1,2;1,3',
    },
  ]);

  const DIMENSION = +dimension;
  const MOVEMENTS = convertStringToValidMovements(movements);
  const ZOMBIE = parseZombieCoordinate(zombie);
  const CREATURES = parseCreatures(creatures);

  const worldMap = generateMap(DIMENSION, ZOMBIE, CREATURES, [...MOVEMENTS]);

  zombieApocalypse = new ZombieApocalypse(worldMap, MOVEMENTS);
}

async function askForAction(action = '') {
  const result = await inquier.prompt([
    {
      name: 'action',
      message: 'What do you want to do?',
      type: 'list',
      choices: [
        { name: 'simulate', value: 'simulate' },
        { name: 'quit', value: 'quit' },
      ],
    },
  ]);
  action = result.action;

  if (action === 'simulate') {
    zombieApocalypse.moveUnits();
    zombieApocalypse.printMap();
    await askForAction();
  } else if (action === 'quit') {
    return;
  }
}

(async function startApplication() {
  try {
    await setupEnvironment();
    zombieApocalypse.printMap();
    await askForAction();
  } catch (error) {
    console.error(error);
  }
})();
