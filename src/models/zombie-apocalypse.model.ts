import { move } from '../utils/movement';
import { getUnits } from '../utils/world-map.util';
import { TileContent, WorldMap } from './map.model';
import { MOVE_DIRECTION } from './movement-direction.enum';

export class ZombieApocalypse {
  public currentMoveIndex = 0;
  public readonly dimension: {
    height: number;
    width: number;
  };

  constructor(
    public worldMap: WorldMap,
    private readonly moves: MOVE_DIRECTION[],
  ) {
    this.dimension = {
      height: worldMap.length,
      width: worldMap[0].length,
    };
  }

  public moveUnits(): void {
    const zombies = getUnits(this.worldMap, TileContent.ZOMBIE);

    zombies.forEach((z) => {
      const newCoordinate = move(
        z,
        this.moves[this.currentMoveIndex],
        this.dimension,
      );

      const newTile = this.worldMap[newCoordinate.y][newCoordinate.x];

      this.worldMap[z.y][z.x].next = TileContent.EMPTY;
      newTile.next = TileContent.ZOMBIE;

      if (newTile.content === TileContent.CREATURE) {
        const newZombieCoordinate = move(
          newCoordinate,
          this.moves[this.currentMoveIndex],
          this.dimension,
        );

        this.worldMap[newZombieCoordinate.y][newZombieCoordinate.x].next =
          TileContent.ZOMBIE;
      }
    });

    if (this.currentMoveIndex === this.moves.length - 1) {
      this.currentMoveIndex = 0;
    } else {
      this.currentMoveIndex++;
    }
  }
}
