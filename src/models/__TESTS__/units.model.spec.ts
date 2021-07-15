import { MOVE_DIRECTION } from '../movement-direction.enum';
import { Zombie } from '../units.model';

it('should update coordinate when a zombie move', () => {
  const x = 0;
  const y = 0;
  const id = 1;
  const moves = [MOVE_DIRECTION.RIGHT];

  const zombie = new Zombie({ x, y }, id, moves);

  expect(zombie).toBeTruthy();
});
